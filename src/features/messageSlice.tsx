import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { schema } from "normalizr";
import { MessageEntity } from "../pages/ItemPageOfTabHome/Chat";
import messageApi from "../api/messageApi";

// Async thunks
export const getMessages = createAsyncThunk(
  "messages",
  async (
    {
      friendId,
      userId,
      access_token,
      createdAt,
    }: {
      friendId: string;
      userId: string;
      access_token: string;
      createdAt: Date;
    },
    thunkAPI: any
  ): Promise<MessageEntity[]> => {
    try {
      const response: MessageEntity[] = await messageApi.fethGetMessages(
        friendId,
        userId,
        access_token,
        createdAt
      );
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addOldMessageStartCreatedAt = createAsyncThunk(
  "addOldMessageStartCreatedAt",
  async (
    {
      friendId,
      userId,
      access_token,
      createdAt,
    }: {
      friendId: string;
      userId: string;
      access_token: string;
      createdAt: Date;
    },
    thunkAPI: any
  ): Promise<MessageEntity[]> => {
    try {
      const response: MessageEntity[] = await messageApi.fethGetMessages(
        friendId,
        userId,
        access_token,
        createdAt
      );
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const setIsReadMessageStartDate = createAsyncThunk(
  "setIsReadMessageStartDate",
  async (
    {
      friendId,
      access_token,
      createdAt,
    }: {
      friendId: string;
      access_token: string;
      createdAt: Date;
    },
    thunkAPI: any
  ): Promise<{ friendId: string }> => {
    try {
      await messageApi.fethSetIsReadMessageStartDate(
        friendId,
        access_token,
        createdAt
      );
      return { friendId: friendId };
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
///load add messages old by createdAt message last on the file message into the messages

const initialState: { messages: MessageEntity[] } = {
  messages: [],
};
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = sortByCreatedAt(action.payload.messages);
    },
    addMessage: (state, action: PayloadAction<MessageEntity>) => {
      state.messages.push(action.payload);
      setMessages(sortByCreatedAt(state.messages));
      console.log("state.messages.length");
      console.log(state.messages.length);
    },
    addMessages: (
      state,
      action: PayloadAction<{ message: MessageEntity[] }>
    ) => {
      state.messages = [...state.messages, ...action.payload.message];
      setMessages(sortByCreatedAt(state.messages));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.fulfilled, (state, action) => {
        if (action.payload) {
          state.messages = sortByCreatedAt(action.payload);
        }
      })

      .addCase(setIsReadMessageStartDate.fulfilled, (state, action) => {
        state.messages = state.messages.map((mess) => {
          if (mess.senderId === action.payload.friendId) {
            mess.isRead = true;
          }
          return mess;
        });
      })
      .addCase(addOldMessageStartCreatedAt.fulfilled, (state, action) => {
        state.messages = sortByCreatedAt([...state.messages,...action.payload]);
      });
  },
});
function sortByCreatedAt(messages: MessageEntity[]): MessageEntity[] {
  return messages.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      const a_createdAt =
        typeof a.createdAt === "string" ? new Date(a.createdAt) : a.createdAt;
      const b_createdAt =
        typeof b.createdAt === "string" ? new Date(b.createdAt) : b.createdAt;

      return b_createdAt.getTime() - a_createdAt.getTime();
    }
    return 0;
  });
}

export default messagesSlice.reducer;
export const { setMessages, addMessage } = messagesSlice.actions;
