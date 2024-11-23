import { createSlice } from "@reduxjs/toolkit";
import { MessageEntity } from "../pages/ItemPageOfTabHome/Chat";
import { FriendEntity } from "./friendsSlice";


interface NotificationEntity{
    type:"friend"|"message";
    notification:any
}
const initialState: { notifications: NotificationEntity[] } = {
    notifications: [],
};
const notifications = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state, action) => {
            
        },
    },
});