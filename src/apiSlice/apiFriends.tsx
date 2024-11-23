import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../api/base_url";
import { normalize, schema } from "normalizr";
import { FriendEntity } from "../features/friendsSlice";
import { UserInformations } from "../features/authenticationSlice";

export const apiFriends = createApi({
  reducerPath: "apiFriends",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL + "api/friends/",
    prepareHeaders: (headers, { getState }: any) => {
      // Lấy token từ store hoặc từ bất kỳ nơi nào bạn lưu trữ token
      const token = getState().authentication.access_token; // Giả sử bạn lưu token trong state.authentication.token
      // Nếu có token, thêm nó vào headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllFriendsByUserId: build.query<FriendEntity[], string>({
      query: (userId) => `find-all-friends-by-user-id`,
      transformResponse: (response: FriendEntity[]) => {
        console.log(response)
        return response
      },
      transformErrorResponse: (response) => {
        console.log(response);
        return response.status;
      },
    }),
    getListFriendsStatus: build.query<UserInformations[], string>({
      query: () => "get-list-friends-status",
      transformResponse: (response: UserInformations[]) => {
        console.log("response")
        console.log(response)
        return response
      },
      transformErrorResponse: (response) => {
        console.log(response);
        return response.status;
      },
    })
  }),
});
export const { useGetAllFriendsByUserIdQuery, useGetListFriendsStatusQuery } = apiFriends;
