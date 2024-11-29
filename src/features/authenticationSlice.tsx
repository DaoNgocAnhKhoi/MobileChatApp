import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import accountApi from "../api/accountApi";
import { deleteToken, saveToken } from "../utils/storeKeychain";

export interface UserInformations {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: "male" | "female";
  birthDate: Date;
  active: boolean;
  updatedAt: string;
  listFriendsId: string[];
  // Add other fields based on your user information structure
}

interface LoginResponse {
  access_token: string;
  user: UserInformations;
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
  async (credentials: any, thunkAPI: any): Promise<LoginResponse> => {
    try {
      const response: LoginResponse = await accountApi.fetchLogin(credentials);
      saveToken(response.access_token)
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const changeUserInformations = createAsyncThunk(
  "user/changeUserInformations",
  async (
    { access_token, user }: { access_token: string; user: UserInformations },
    thunkAPI: any
  ): Promise<UserInformations> => {
    try {
      const response: UserInformations =
        await accountApi.fetchChangeUserInformations(access_token, user);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk<
  string, // Kiểu dữ liệu trả về nếu thành công (API trả về một chuỗi)
  { passwordCurrent: string; passwordNew: string; access_token: string }, // Kiểu tham số đầu vào
  { rejectValue: string } // Kiểu dữ liệu trả về khi thất bại
>(
  "user/changePassword",
  async (
    { passwordCurrent, passwordNew, access_token },
    { rejectWithValue }
  ) => {
    try {
      const response: string = await accountApi.fetchChangePassword(
        access_token,
        passwordCurrent,
        passwordNew
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message.toString());
    }
  }
);
export const logout = createAsyncThunk(
  "account/logout",
  async (access_token: string, thunkAPI) => {
    try {
      await accountApi.fetchLogout(access_token);
      deleteToken()
      return { message: "logout successful." };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getUser = createAsyncThunk(
  "account/get-user",
  async (access_token: string, thunkAPI) => {
    try {
      const response = await accountApi.fetchCheckLogin(access_token);
      return {user:response,access_token:access_token};
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
// );4


interface FetchAllUsersExceptSelfArgs {
  access_token: string;
  userId: string;
}

export const fetchAllUsersExceptSelf = createAsyncThunk<
  UserInformations[], // Kiểu dữ liệu trả về
  FetchAllUsersExceptSelfArgs, // Tham số đầu vào
  { rejectValue: string } // Lỗi khi thất bại
>(
  "users/fetchAllUsersExceptSelf",
  async ({ access_token, userId }: FetchAllUsersExceptSelfArgs, thunkAPI) => {
    try {
      const users = await accountApi.fetchAllUser(access_token, userId); // Đảm bảo trả về UserInformations[]
      return users;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



// Slice
interface AuthenticationState {
  isAuthenticated: boolean;
  message: string;
  access_token: string;
  user: UserInformations | null;
  users: UserInformations[]; // Danh sách người dùng
  fetchError: string; // Lỗi khi gọi API
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  message: "",
  access_token: "",
  user: null,
  users: [], // Danh sách người dùng
  fetchError: "", // Lỗi khi gọi API
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticationLog(state) {
      console.log(current(state));
    },
    deleteUserFromList(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    addUserToList(state, action) {
      state.users.push(action.payload);
    }

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
        if (action.payload?.access_token) {
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
      .addCase(changeUserInformations.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.message = action?.payload ? action.payload : "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.message = "Login successful.";
        state.access_token = action.payload.access_token;
        state.user = action.payload.user;
      })
      .addCase(fetchAllUsersExceptSelf.pending, (state) => {
        state.message = "Fetching users...";
      })
      .addCase(fetchAllUsersExceptSelf.fulfilled, (state, action) => {
        state.users = action.payload; // Lưu danh sách người dùng vào state
        state.message = "Fetched users successfully.";
        state.fetchError = "";
      })
      .addCase(fetchAllUsersExceptSelf.rejected, (state, action) => {
        state.fetchError = action.payload || "Failed to fetch users.";
      });   
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

export const { authenticationLog, deleteUserFromList, addUserToList } = authenticationSlice.actions;
export default authenticationSlice.reducer;
