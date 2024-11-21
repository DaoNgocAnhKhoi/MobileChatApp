import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { schema } from "normalizr";
import { MessageEntity } from "../pages/ItemPageOfTabHome/Chat";
import friendApi from "../api/friendApi";
import { setMessages } from "./messageSlice";
const entityMessage = new schema.Entity("message");
const entityFriend = new schema.Entity("friends", {
  message: [entityMessage],
});
export interface FriendEntity {
  id: string;
  userId1: string;
  userId2: string;
  message: MessageEntity | null;
  fullNameUser1: string;
  fullNameUser2: string;
  active:boolean;
  updatedAt: string;
}
const initialState: FriendEntity[] = [];
export const changeMessageNewInFriend = createAsyncThunk(
  "friends/changeMessageLast",
  async ({
    friendId,
    userId,
    access_token,
    message,
  }: {
    friendId: string;
    userId: string;
    access_token: string;
    message: MessageEntity;
  }) => {
    await friendApi.changeMessageNew(friendId, userId, access_token, message);
    return { friendId, message, userId };
  }
);

export const setIsReadMessageIntoFriend = createAsyncThunk(
  "setIsReadMessageIntoFriend",
  async (
    {
      friendId,
      access_token,
      id,
    }: {
      friendId: string;
      access_token: string;
      id: string;
    },
    thunkAPI: any
  ) => {
    try {
      await friendApi.fethSetIsReadMessageIntoFriend(
        friendId,
        access_token,
        id
      );
      return { id:id, friendId:friendId };
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: initialState,
  },
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    setMessages:(state, action) => {
      const updatedFriends = state.friends.map((friend) => {
        if (
          (friend.userId1 === action.payload.friendId &&
            friend.userId2 === action.payload.userId) ||
          (friend.userId2 === action.payload.friendId &&
            friend.userId1 === action.payload.userId)
        ) {
          const messageUpdate = action.payload.message;
          return { ...friend, message: messageUpdate };
        }
        return friend;
      });
      state.friends = updatedFriends;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeMessageNewInFriend.fulfilled, (state, action) => {
        const updatedFriends = state.friends.map((friend) => {
          if (
            (friend.userId1 === action.payload.friendId &&
              friend.userId2 === action.payload.userId) ||
            (friend.userId2 === action.payload.friendId &&
              friend.userId1 === action.payload.userId)
          ) {
            return { ...friend, message: action.payload.message };
          }
          return friend;
        });
        state.friends = updatedFriends;
      })
      .addCase(setIsReadMessageIntoFriend.fulfilled, (state, action) => {
        console.log("setIsReadMessageIntoFriend fulfilled");
        console.log(state.friends);
        const updatedFriends = state.friends.map((friend) => {
          console.log("1: "+friend.id);
          console.log("2: "+action.payload.id);
          if (friend.id === action.payload.id) {
            const messageUpdate = friend.message;
            if (messageUpdate) {
              console.log(true);
              messageUpdate.isRead = true;
            }
            return { ...friend, message: messageUpdate };
          }
          return friend;
        });
        state.friends = updatedFriends;
      })
      .addCase(setIsReadMessageIntoFriend.rejected, (action) => {
        console.log("setIsReadMessageIntoFriend rejected");
        // Handle error here. You could dispatch an action to retry the request, or display a notification.
      });
  },
});

export default friendsSlice.reducer;
export const { setFriends } = friendsSlice.actions;
