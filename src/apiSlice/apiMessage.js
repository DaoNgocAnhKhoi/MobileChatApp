import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../api/base_url";
import { normalize, schema } from "normalizr";

export const apiMessage = createApi({
  reducerPath: "apiMessage",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL+"app/",
    prepareHeaders: (headers, { getState }) => {
      // Lấy token từ store hoặc từ bất kỳ nơi nào bạn lưu trữ token
      const token = getState().authentication.access_token; // Giả sử bạn lưu token trong state.authentication.token
      // Nếu có token, thêm nó vào headers
      headers.set("Content-Type", "application/json")
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    sendMessage: build.mutation({
      query: (newMessage) => {
        return {
          url: `send-message`,
          method: 'POST',
          body: JSON.stringify({
            content: newMessage.content,  
            senderId: newMessage.senderId, 
            receiverId: newMessage.receiverId
          })

        };
      },
      transformResponse: (response) => {
        console.log("apiFriends")
        console.log(response)
        return response;
      },
      transformErrorResponse: (response) => {
        console.log(response)
        return response.status;
      }
    })
  })
})
export const { useSendMessageMutation } = apiMessage;