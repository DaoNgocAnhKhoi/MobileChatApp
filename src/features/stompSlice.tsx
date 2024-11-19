import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";

interface StompState {
  client: Client | null;
  connected: boolean;
  messages: string[];
}
const initialState: StompState = {
  client: null,
  connected: false,
  messages: [],
};

const stompSlice = createSlice({
    name: "stomp",
    initialState,
    reducers: {
        setClient(state, action: PayloadAction<Client>){
            state.client = action.payload;
        },
        setConnected(state, action: PayloadAction<boolean>){
            state.connected = action.payload;
        },
        addMessage(state, action: PayloadAction<string>){
            state.messages.push(action.payload);
        },
        disconnect(state){
            if(state.client){
                state.client.deactivate();
                state.client = null;
            }
            state.connected = false;
        }
    }

})
export const {setClient, setConnected, addMessage, disconnect} = stompSlice.actions;
export default stompSlice.reducer