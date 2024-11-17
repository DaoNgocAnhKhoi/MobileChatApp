import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import accountApi from "../api/accountApi";


interface UserInformations {
    name: string;
    email: string;
    // Add other fields based on your user information structure
}

interface LoginResponse {
    access_token: string;
    user: UserInformations
    // Add other fields returned by the login API
}
interface RegisterResponse {
    message: string;
    // Add other fields returned by the register API
}


// Định nghĩa kiểu cho SerializedError
interface SerializedError {
    name?: string;
    message?: string;
    code?: string;
    stack?: string;
}

// Định nghĩa các kiểu cho Pending, Fulfilled, Rejected actions
interface PendingAction<ThunkArg> {
    type: string;
    payload: undefined;
    meta: {
        requestId: string;
        arg: ThunkArg;
    };
}

interface FulfilledAction<ThunkArg, PromiseResult> {
    type: string;
    payload: PromiseResult;
    meta: {
        requestId: string;
        arg: ThunkArg;
    };
}

interface RejectedAction<ThunkArg> {
    type: string;
    payload: undefined;
    error: SerializedError | any;
    meta: {
        requestId: string;
        arg: ThunkArg;
        aborted: boolean;
        condition: boolean;
    };
}

interface RejectedWithValueAction<ThunkArg, RejectedValue> {
    type: string;
    payload: RejectedValue;
    error: { message: "Rejected" };
    meta: {
        requestId: string;
        arg: ThunkArg;
        aborted: boolean;
    };
}

// Các kiểu hàm cho Pending, Fulfilled, Rejected actions
type Pending = <ThunkArg>(
    requestId: string,
    arg: ThunkArg
) => PendingAction<ThunkArg>;

type Fulfilled = <ThunkArg, PromiseResult>(
    payload: PromiseResult,
    requestId: string,
    arg: ThunkArg
) => FulfilledAction<ThunkArg, PromiseResult>;

type Rejected = <ThunkArg>(
    requestId: string,
    arg: ThunkArg
) => RejectedAction<ThunkArg>;

type RejectedWithValue = <ThunkArg, RejectedValue>(
    requestId: string,
    arg: ThunkArg
) => RejectedWithValueAction<ThunkArg, RejectedValue>;

// Định nghĩa kiểu userEntity
const userEntity = new schema.Entity("user");

// Async thunks
export const login = createAsyncThunk(
    "account/login",
    async (
        credentials: any,
        thunkAPI:any
    ):Promise<LoginResponse> => {
        try {
            const response:LoginResponse = await accountApi.fetchLogin(credentials);
            console.log(response)
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    "account/logout",
    async (_, thunkAPI) => {
        try {
            await accountApi.fetchLogout();
            return { message: "logout successful." };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// export const register = createAsyncThunk(
//     "account/register",
//     async (
//         credentials: { username: string; password: string },
//         thunkAPI:any
//     ): Promise<RegisterResponse> => {
//         try {
//             const response = await accountApi.fetchRegister(credentials);
//             // const normalizedData = normalize(response.data.user, [userEntity]);
//             return response;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );

// Slice
interface AuthenticationState {
    isAuthenticated: boolean;
    message: string;
    access_token: string;
    user: any | null;
}

const initialState: AuthenticationState = {
    isAuthenticated: false,
    message: "",
    access_token: "",
    user: null,
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        authenticationLog(state) {
            console.log(current(state));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isAuthenticated = false;
                state.message = "Logging in...";
                state.user = null;
                state.access_token = "";
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload?.user) {
                    state.isAuthenticated = true;
                    state.user = action.payload.user;
                    state.message = "Login successful.";
                    state.access_token = action.payload.access_token;
                } else {
                    state.isAuthenticated = false;
                    state.message = "Invalid username or password.";
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.message =
                    (action.payload as { message: string } | undefined)?.message ||
                    "An error occurred during login.";
            })
            .addCase(logout.pending, (state) => {
                state.message = "Logging out...";
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.message = "Logout successful.";
                state.user = null;
                state.access_token = "";
            })
            .addCase(logout.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.message =
                    (action.payload as { message: string } | undefined)?.message ||
                    "An error occurred during logout.";
            })
            // .addCase(register.pending, (state) => {
            //     state.message = "Registering...";
            // })
            // .addCase(register.fulfilled, (state, action) => {
            //     if (action.payload?.user) {
            //         state.isAuthenticated = true;
            //         state.user = action.payload.user;
            //         state.message = "Register successful.";
            //     } else {
            //         state.isAuthenticated = false;
            //         state.message = "Invalid registration information.";
            //     }
            // })
            // .addCase(register.rejected, (state, action) => {
            //     state.message =
            //     (action.payload as { message: string } | undefined)?.message ||
            //     "An error occurred during registration.";
            // });
    },
});

export const { authenticationLog } = authenticationSlice.actions;
export default authenticationSlice.reducer;
