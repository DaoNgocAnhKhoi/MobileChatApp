import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Notifications from "./Notifications";
import Profile from "./Profile";
import { useTheme } from "react-native-paper";
import Chat, { MessageEntity } from "./Chat";
import Friends from "./Friends";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../configuration/redux";
import { useContext, useEffect, useState } from "react";
import { BASE_URL, BASE_URL_STOMP_CONNECT } from "../../api/base_url";
import { StompContext, StompContextProvider } from "./StompContext";
import { createStackNavigator } from "@react-navigation/stack";
import { Client, Stomp, StompHeaders } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { addMessage } from "../../features/messageSlice";
import { changeMessageNewInFriend } from "../../features/friendsSlice";
import { AppState } from "react-native";
import { FriendEntity } from "../../features/friendsSlice";
import {
  addUserToList,
  deleteUserFromList,
} from "../../features/authenticationSlice";
import {
  addFriend,
  deleteFriend,
  addSentRequest,
  deleteSentRequest,
  addReceivedRequest,
  deleteReceivedRequest,
  addBlacklist,
  deleteBlacklist
} from "../../features/friendsSlice";
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
import { fetchAllUsersExceptSelf } from "../../features/authenticationSlice";

function TabNavigator() {
  const theme = useTheme();
  const { colors } = theme;
  const [reconnect, setReconnect] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();

  const { access_token, user } = useSelector(
    (state: RootState) => state.authentication
  ) as {
    access_token: string;
    user: { id: string };
  };
  const context = useContext(StompContext);
  // Kiểm tra context nếu nó không phải là undefined
  if (!context) {
    throw new Error("ComponentA must be used within a MyContextProvider");
  }
  const { stompClient, setStompClient } = context;
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    // Tạo kết nối SockJS
    const socket = () => new SockJS(BASE_URL + "ws"); // WebSocket factory
    const stompClient = new StompJs.Client({
      brokerURL: undefined, // Để undefined nếu dùng SockJS
      webSocketFactory: socket, // Đặt WebSocket factory
      debug: (msg: string) => console.log("STOMP Debug: ", msg),
      reconnectDelay: 5000, // Thử kết nối lại sau 5 giây
    });
    stompClient.onConnect = (frame: any) => {
      stompClient.subscribe(
        "/app/authentication",
        (message) => {
          const jsonObject: MessageEntity = JSON.parse(message.body);

          dispatch(addMessage(jsonObject));
          if (user && user?.id) {
            const info = {
              friendId: jsonObject.senderId, // The friend ID
              userId: user?.id, // User ID (default empty if user is undefined)
              access_token: access_token, // Access token for authentication
              message: jsonObject, // The message object
            };
            dispatch(changeMessageNewInFriend(info) as any);
          }
        },
        {
          Authorization: "Bearer " + access_token, // Gửi token nếu cần
        }
      );

      stompClient.subscribe(
        "/topic/friends/" + user.id, // Channel for user-specific friends' updates
        (message) => {
          const updatedFriend = JSON.parse(message.body);

            const friend: FriendEntity = updatedFriend;
            if (friend.status === "friend") {
              if (friend.userId1 === user.id) {
                dispatch(addFriend(friend));
                dispatch(deleteSentRequest(friend.id));
                dispatch(addBlacklist(friend.userId2));
              } else {
                dispatch(addFriend(friend));
                dispatch(deleteReceivedRequest(friend.id));
                dispatch(addBlacklist(friend.userId1));
              }
            } else if (friend.status === "pending") {
              if (friend.userId1 === user.id) {
                dispatch(addSentRequest(friend));
                dispatch(addBlacklist(friend.userId2));
              } else {
                dispatch(addReceivedRequest(friend));
                dispatch(addBlacklist(friend.userId1));
              }
            } else if (friend.status === "cancel") {
              if (friend.userId1 === user.id) {
                dispatch(deleteSentRequest(friend.id));
                dispatch(deleteBlacklist(friend.userId2));
              } else {
                dispatch(deleteReceivedRequest(friend.id));
                dispatch(deleteBlacklist(friend.userId1));
              }
            } else if (friend.status === "reject") {
              if (friend.userId1 === user.id) {
                dispatch(deleteReceivedRequest(friend.id));
                dispatch(deleteBlacklist(friend.userId2));
              } else {
                dispatch(deleteSentRequest(friend.id));
                dispatch(deleteBlacklist(friend.userId1));
              }
            } else if (friend.status === "delete") {
              if (friend.userId1 === user.id) {
                dispatch(deleteFriend(friend.userId2));
                dispatch(deleteBlacklist(friend.userId2));
              } else {
                dispatch(deleteFriend(friend.userId1));
                dispatch(deleteBlacklist(friend.userId1));
              }
            }
            
            else {
              console.error("Unknown friend status: ", friend.status);
            }
          },
          
        {
          Authorization: "Bearer " + access_token,
        }
      );
    };

    stompClient.onStompError = (error: any) => {
      console.error("STOMP Error: ", error);
    };
    stompClient.activate();
    setStompClient(stompClient);
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setAppState(nextAppState);
      console.log("AppState changed:", nextAppState);

      // Kiểm tra trạng thái là 'background' hoặc 'inactive'
      if (nextAppState === "background") {
        console.log("App moved to background");
        console.log(stompClient);
        stompClient?.publish({
          destination: "/app/disconnect",
          headers: {
            Authorization: "Bearer " + access_token,
          },
        });

        // stompClient.deactivate()
        // Thực hiện hành động khi app chuyển sang nền, ví dụ lưu trữ dữ liệu
      } else if (nextAppState === "inactive") {
        console.log("App is inactive");
        // Thực hiện hành động khi app không còn ở trạng thái active
      } else if (nextAppState === "active") {
        stompClient?.publish({
          destination: "/app/authentication",
          headers: {
            Authorization: "Bearer " + access_token,
          },
        });

        // stompClient.activate();
      }
    });

    // Cleanup khi component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Chat"
      barStyle={{ backgroundColor: colors.primary }}
      activeColor={colors.onBackground}
      inactiveColor={colors.background}
    >
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-processing"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-friends" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function HomeScreen() {
  return <TabNavigator />;
}
