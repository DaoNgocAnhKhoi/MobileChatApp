import { createSlice } from "@reduxjs/toolkit";
import { schema } from "normalizr";
const entityMessage = new schema.Entity("message");
const entityFriend = new schema.Entity("friends", {
  message: [entityMessage],
});
const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
  },
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
  },
});

export default friendsSlice.reducer;
export const { setFriends } = friendsSlice.actions;
