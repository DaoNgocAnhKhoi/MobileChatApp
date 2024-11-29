import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { schema } from "normalizr";
import { MessageEntity } from "../pages/ItemPageOfTabHome/Chat";
import friendApi from "../api/friendApi";
import { RootState } from "../configuration/redux";

// import { setMessages } from "./messageSlice";
const entityMessage = new schema.Entity("message");
// const entityFriend = new schema.Entity("friends", {
//   message: [entityMessage],
// });

export interface FriendEntity {
  id: string;
  userId1: string;
  userId2: string;
  message: MessageEntity | null;
  fullNameUser1: string;
  fullNameUser2: string;
  active: boolean;
  updatedAt: string;
  sendId: string;
  status: "pending" | "friend" | "reject" | "cancel" | "delete";
  note: boolean;
}

export interface FriendRequest {
  friendId: string;
  message: MessageEntity;
  email: string;
}

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
      return { id: id, friendId: friendId };
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// New Thunks for friend requests and actions

// Fetch Friend Requests
export const fetchFriendRequests = createAsyncThunk<
  {
    sent_request: FriendEntity[];
    received_request: FriendEntity[];
    friends: FriendEntity[];
  },
  { access_token: string },
  { rejectValue: string }
>("friends/fetchFriendRequests", async ({ access_token }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const currentUserId = state.authentication.user?.id;

    const friends = await friendApi.getFriendRequests(access_token);

    const sent_request = friends.filter(
      (friend: FriendEntity) => friend.status === "pending" && friend.userId1 === currentUserId
    );
    const received_request = friends.filter(
      (friend: FriendEntity) => friend.status === "pending" && friend.userId2 === currentUserId
    );
    const friendsList = friends.filter(
      (friend: FriendEntity) => friend.status === "friend"
    );

    return { sent_request, received_request, friends: friendsList };
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error.message);
  }
});


// Send friend request
export const sendFriendRequest = createAsyncThunk(
  "friends/sendFriendRequest",
  async ({ friendRequest, access_token }: { friendRequest: FriendRequest; access_token: string }) => {
    const data = await friendApi.sendFriendRequest(friendRequest, access_token);
    return data.request;
  }
);

// Accept Friend Request
export const acceptFriendRequest = createAsyncThunk(
  "friends/acceptFriendRequest",
  async ({ requestId, access_token }: { requestId: string; access_token: string }) => {
    const data = await friendApi.acceptFriendRequest(requestId, access_token);
    return data.request;
  }
);

// Decline Friend Request
export const declineFriendRequest = createAsyncThunk(
  "friends/declineFriendRequest",
  async ({ requestId, access_token }: { requestId: string; access_token: string }) => {
    const data = await friendApi.declineFriendRequest(requestId, access_token);
    return data.request;
  }
);

// Cancel Friend Request
export const cancelFriendRequest = createAsyncThunk(
  "friends/cancelFriendRequest",
  async ({ requestId, access_token }: { requestId: string; access_token: string }) => {
    const data = await friendApi.cancelFriendRequest(requestId, access_token);
    return data.request;
  }
);

// Remove Friend
export const removeFriend = createAsyncThunk(
  "friends/removeFriend",
  async ({ friendId, access_token }: { friendId: string; access_token: string }) => {
    const data = await friendApi.removeFriend(friendId, access_token);
    return data;
  }
);

// Get All Friends
export const getAllFriendsByUserId = createAsyncThunk(
  "friends/getAllFriendsByUserId",
  async (access_token: string) => {
    const data = await friendApi.getAllFriendsByUserId(access_token);
    return data;
  }
);

const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [] as FriendEntity[],
    sent_request: [] as FriendEntity[],
    received_request: [] as FriendEntity[],
    blacklist: [] as string[],
  },
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    deleteFriend: (state, action) => {
      state.friends = state.friends.filter(
        (friend) => friend.id !== action.payload
      );
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    setMessages: (state, action) => {
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
    },
    setSentRequest: (state, action) => {
      state.sent_request = action.payload;
    },
    deleteSentRequest: (state, action) => {
      state.sent_request = state.sent_request.filter(
        (item: FriendEntity) => item.id !== action.payload
      );
    },
    addSentRequest: (state, action) => {
      state.sent_request.push(action.payload);
    },
    setReceivedRequest: (state, action) => {
      state.received_request = action.payload;
    },
    deleteReceivedRequest: (state, action) => {
      state.received_request = state.received_request.filter(
        (item: FriendEntity) => item.id !== action.payload
      );
    },
    addReceivedRequest: (state, action) => {
      state.received_request.push(action.payload);
    },
    setBlacklist: (state, action) => {
      state.blacklist = action.payload;
    },
    deleteBlacklist: (state, action) => {
      state.blacklist = state.blacklist.filter(
        (item: string) => item !== action.payload
      );
    },
    addBlacklist: (state, action) => {
      state.blacklist.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendRequests.fulfilled, (state, action) => {
        const { sent_request, received_request, friends } = action.payload;
        state.sent_request = sent_request;
        state.received_request = received_request;
        state.friends = friends;
      })
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
        state.friends = sortByCreatedAt(updatedFriends);
      })
      .addCase(setIsReadMessageIntoFriend.fulfilled, (state, action) => {
        const updatedFriends = state.friends.map((friend) => {
          if (friend.id === action.payload.id) {
            const messageUpdate = friend.message;
            if (messageUpdate) {
              messageUpdate.isRead = true;
            }
            return { ...friend, message: messageUpdate };
          }
          return friend;
        });
        state.friends = sortByCreatedAt(updatedFriends);
      })
      // .addCase(acceptFriendRequest.fulfilled, (state, action) => {
      //   // Update state after friend request is accepted
      //   const updatedFriends = [...state.friends, action.payload];
      //   state.friends = updatedFriends;
      // })
      // .addCase(declineFriendRequest.fulfilled, (state, action) => {
      //   // Update state after friend request is declined
      //   state.received_request = state.received_request.filter(
      //     (request) => request.id !== action.payload.id
      //   );
      // })
      // .addCase(removeFriend.fulfilled, (state, action) => {
      //   state.friends = state.friends.filter(
      //     (friend) => friend.id !== action.payload.id
      //   )
      // })
      // .addCase(sendFriendRequest.fulfilled, (state, action) => {
      //   const newFriendRequest = action.payload;
      //   // Remove friend ra khỏi danh sách users
      //   state.sent_request.push(newFriendRequest); // Thêm friend request vào danh sách gửi
      // })
      // .addCase(cancelFriendRequest.fulfilled, (state, action) => {
      //   // Remove friend request from the list
      //   state.sent_request = state.sent_request.filter(
      //     (request) => request.id !== action.payload.id
      //   );
      // })
      .addCase(getAllFriendsByUserId.fulfilled, (state, action) => {
        state.friends = action.payload;
      });
  },
});

function sortByCreatedAt(friends: FriendEntity[]): FriendEntity[] {
  return friends.sort((a, b) => {
    if (a.message && b.message) {
      const a_createdAt =
        typeof a.message.createdAt === "string"
          ? new Date(a.message.createdAt)
          : a.message.createdAt;
      const b_createdAt =
        typeof b.message.createdAt === "string"
          ? new Date(b.message.createdAt)
          : b.message.createdAt;
      if (b_createdAt && a_createdAt) {
        return b_createdAt.getTime() - a_createdAt.getTime();
      }
    }
    return 0;
  });
}

export default friendsSlice.reducer;
export const { setFriends, addFriend, deleteFriend, addSentRequest, deleteSentRequest, addReceivedRequest, deleteReceivedRequest,
  setBlacklist, addBlacklist, deleteBlacklist
 } = friendsSlice.actions;
