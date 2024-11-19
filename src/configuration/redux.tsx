import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authenticationSlice";
import { apiFriends } from "../apiSlice/apiFriends";
import friendReducer from "../features/friendsSlice";
import { apiMessage } from "../apiSlice/apiMessage";
export const store = configureStore({
  reducer: {
    [apiFriends.reducerPath]: apiFriends.reducer,
    [apiMessage.reducerPath]: apiMessage.reducer,
    authentication: authenticationReducer,
    friends: friendReducer,
  },
  // Thêm middleware của apiFriends
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiFriends.middleware, apiMessage.middleware),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
