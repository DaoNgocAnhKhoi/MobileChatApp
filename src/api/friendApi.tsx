import { FriendEntity, FriendRequest } from "../features/friendsSlice";
import { MessageEntity } from "../pages/ItemPageOfTabHome/Chat";
import { BASE_URL } from "./base_url";

const friendApi = {
  // Existing API methods

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
    id: string
  ) {
    try {
      console.log("FethSetIsReadMessageIntoFriend");
      console.log(id);
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
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error: any) {
      throw new Error(`Error fetching read status: ${error.message}`);
    }
  },

  // New API methods to match the backend endpoints

  // Get Friend Requests
  async getFriendRequests(access_token: string) {
    try {
      const response = await fetch(BASE_URL + "api/friends/requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const friends: FriendEntity[] = await response.json();
      console.log("Friend Requests:", friends);
      return friends;
    } catch (error: any) {
      console.error("Error fetching friend requests:", error);
      throw new Error(error.message);
    }
  },

  // Accept Friend Request
  async acceptFriendRequest(requestId: string, access_token: string) {
    try {
      const response = await fetch(
        BASE_URL + "api/friends/accept-make-friend?requestId=" + requestId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error accepting friend request:", error);
      throw new Error(error.message);
    }
  },

  // Send Friend Request
  async sendFriendRequest(friendRequest: FriendRequest, access_token: string) {
    try {
      const response = await fetch(BASE_URL + "api/friends/send-make-friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
        body: JSON.stringify(friendRequest), // Send the friend's email as part of the request
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "success") {
        console.log("Friend request sent successfully:", data.message);
        return data;
      } else {
        console.log("Error sending friend request:", data.message);
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.error("Error sending friend request:", error);
      throw new Error(error.message);
    }
  },

  // Decline Friend Request
  async declineFriendRequest(requestId: string, access_token: string) {
    try {
      const response = await fetch(
        BASE_URL + "api/friends/decline-make-friend?requestId=" + requestId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error declining friend request:", error);
      throw new Error(error.message);
    }
  },

  // Cancel Friend Request
  async cancelFriendRequest(requestId: string, access_token: string) {
    try {
      const response = await fetch(
        BASE_URL + "api/friends/cancel-make-friend?requestId=" + requestId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error cancelling friend request:", error);
      throw new Error(error.message);
    }
  },

  // Remove Friend
  async removeFriend(friendId: string, access_token: string) {
    try {
      const response = await fetch(
        BASE_URL + "api/friends/remove-friend?friendId=" + friendId, // friendId được truyền trong URL như query parameter
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error removing friend:", error);
      throw new Error(error.message);
    }
  },

  // Get All Friends by User ID
  async getAllFriendsByUserId(access_token: string) {
    try {
      const response = await fetch(
        BASE_URL + "api/friends/find-all-friends-by-user-id",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching all friends:", error);
      throw new Error(error.message);
    }
  },

  // Get List of Friend Status
  async getListFriendStatus(access_token: string) {
    try {
      const response = await fetch(
        BASE_URL + "api/friends/get-list-friends-status",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching friend status list:", error);
      throw new Error(error.message);
    }
  },
};

export default friendApi;
