import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../api/base_url";
import { FriendEntity } from "../features/friendsSlice";
import { UserInformations } from "../features/authenticationSlice";

export const apiFriends = createApi({
  reducerPath: "apiFriends",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL + "api/friends/",
    prepareHeaders: (headers, { getState }: any) => {
      // Get token from state
      const token = getState().authentication.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllFriendsByUserId: build.query<FriendEntity[], string>({
      query: () => "find-all-friends-by-user-id",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // using async/await with the query
          console.log("Friends:", data);
        } catch (error) {
          console.error("Error fetching friends:", error);
        }
      }
    }),

    getListFriendsStatus: build.query<UserInformations[], string>({
      query: () => "get-list-friends-status",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // using async/await with the query
          console.log("Friend Status:", data);
        } catch (error) {
          console.error("Error fetching friend status:", error);
        }
      }
    }),

    sendMakeFriend: build.mutation<any, { email: string }>({
      query: (friendRequest) => ({
        url: "send-make-friend",
        method: "POST",
        body: friendRequest,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Friend request sent:", data);
        } catch (error) {
          console.error("Error sending friend request:", error);
        }
      }
    }),

    acceptFriendRequest: build.mutation<any, { requestId: string }>({
      query: (data) => ({
        url: "accept-make-friend",
        method: "POST",
        params: { requestId: data.requestId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Friend request accepted:", data);
        } catch (error) {
          console.error("Error accepting friend request:", error);
        }
      }
    }),

    declineFriendRequest: build.mutation<any, { requestId: string }>({
      query: (data) => ({
        url: "decline-make-friend",
        method: "POST",
        params: { requestId: data.requestId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Friend request declined:", data);
        } catch (error) {
          console.error("Error declining friend request:", error);
        }
      }
    }),

    cancelFriendRequest: build.mutation<any, { requestId: string }>({
      query: (data) => ({
        url: "cancel-make-friend",
        method: "POST",
        params: { requestId: data.requestId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Friend request canceled:", data);
        } catch (error) {
          console.error("Error canceling friend request:", error);
        }
      }
    }),

    getFriendRequests: build.query<any, void>({
      query: () => "requests",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Friend Requests:", data);
        } catch (error) {
          console.error("Error fetching friend requests:", error);
        }
      }
    }),

    removeFriend: build.mutation<any, { friendId: string }>({
      query: (data) => ({
        url: "remove-friend",
        method: "POST",
        params: { friendId: data.friendId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Friend removed:", data);
        } catch (error) {
          console.error("Error removing friend:", error);
        }
      }
    }),

    changeMessageStatus: build.mutation<any, { friendRequest: any }>({
      query: (friendRequest) => ({
        url: "change-message-new",
        method: "POST",
        body: friendRequest,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Message status updated:", data);
        } catch (error) {
          console.error("Error updating message status:", error);
        }
      }
    }),

    changeMessageReadStatus: build.mutation<any, { friendId: string, id: string }>({
      query: (data) => ({
        url: "change-readed-message-into-friend-by-id-and-by-friendId",
        method: "GET",
        params: { friendId: data.friendId, id: data.id },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Message read status changed:", data);
        } catch (error) {
          console.error("Error changing message read status:", error);
        }
      }
    }),
  }),
});

export const {
  useGetAllFriendsByUserIdQuery,
  useGetListFriendsStatusQuery,
  useSendMakeFriendMutation,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useCancelFriendRequestMutation,
  useGetFriendRequestsQuery,
  useRemoveFriendMutation,
  useChangeMessageStatusMutation,
  useChangeMessageReadStatusMutation,
} = apiFriends;
