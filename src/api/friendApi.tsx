import { FriendEntity } from "../features/friendsSlice";
import { MessageEntity } from "../pages/ItemPageOfTabHome/Chat";
import { BASE_URL } from "./base_url";

const friendApi = {
  async changeMessageNew(
    friendId: string,
    userId: string,
    access_token: string,
    message: MessageEntity
  ) {
    try {
      const response = await fetch(
        BASE_URL + "api/friends/change-message-new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
          body: JSON.stringify({
            friendId: friendId,
            userId: userId,
            message: message,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("changeMessageNew response");
      console.log(response);
    } catch (error) {
      console.error("Error changeMessageNew:", error);
    }
  },
  async fethSetIsReadMessageIntoFriend(
    friendId: string,
    access_token: string,
    id: string,
  ) {
    try {
        console.log("FethSetIsReadMessageIntoFriend")
        console.log(id)
      const response = await fetch(
        BASE_URL +
          "api/friends/change-readed-message-into-friend-by-id-and-by-friendId?friendId=" +
          friendId +
          "&&id=" +
          id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );
      // Kiểm tra nội dung phản hồi
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Nếu phản hồi là JSON, parse nó
    } catch (error: any) {
      throw new Error(`Error fetching login: ${error.message}`);
    }
  },
};
export default friendApi;
