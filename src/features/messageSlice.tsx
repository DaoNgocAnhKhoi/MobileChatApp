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
      if (action.payload.createdAt) {
        const serializedMessage = {
          ...action.payload,
          createdAt: new Date(action.payload.createdAt).toISOString(), // Serialize
        };
        state.messages.push(serializedMessage);
      } else {
        state.messages.push(action.payload);
      }

      setMessages(sortByCreatedAt(state.messages));
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
    builder.addCase(getMessages.fulfilled, (state, action) => {
      if (action.payload) {
        state.messages = sortByCreatedAt(action.payload);
      }
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
