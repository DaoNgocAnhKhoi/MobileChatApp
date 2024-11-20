import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { schema } from "normalizr";
import { MessageEntity } from "../pages/ItemPageOfTabHome/Chat";
import friendApi from "../api/friendApi";
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
    return { friendId, message };
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
  },
  extraReducers: (builder) => {
    builder.addCase(changeMessageNewInFriend.fulfilled, (state, action) => {
      const updatedFriends = state.friends.map((friend) => {
        if (friend.id === action.payload.friendId) {
          return { ...friend, message: action.payload.message };
        }
        return friend;
      });
      state.friends = updatedFriends;
    });
  },
});

export default friendsSlice.reducer;
export const { setFriends } = friendsSlice.actions;
