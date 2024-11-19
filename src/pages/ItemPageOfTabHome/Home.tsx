import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Notifications from "./Notifications";
import Profile from "./Profile";
import { useTheme } from "react-native-paper";
import Chat from "./Chat";
import Friends from "./Friends";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../configuration/redux";
import { useContext, useEffect, useState } from "react";
import { BASE_URL_STOMP_CONNECT } from "../../api/base_url";
import { StompContext, StompContextProvider } from "./StompContext";
import { createStackNavigator } from "@react-navigation/stack";
import { Client, StompHeaders } from "@stomp/stompjs";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const theme = useTheme();
  const { colors } = theme;
  const [reconnect, setReconnect] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const access_token = useSelector(
    (state: RootState) => state.authentication.access_token
  );
  const context = useContext(StompContext);
  // Kiểm tra context nếu nó không phải là undefined
  if (!context) {
    throw new Error("ComponentA must be used within a MyContextProvider");
  }
  const { stompClient, setStompClient } = context;
  // useEffect(() => {

  //   if (reconnect) {
  //     // Tạo một STOMP client
  //     const stompClient = new Client({
  //       brokerURL: BASE_URL_STOMP_CONNECT + "ws", // Địa chỉ WebSocket của bạn
  //       connectHeaders:{
  //         'Authorization': "Bearer " + access_token, // Thêm token vào header
  //       },
  //       debug: (str) => {
  //         console.log(str); // Để debug các hoạt động STOMP
  //       },
  //       onConnect: () => {
  //         console.log("Connected to WebSocket");

  //         stompClient.subscribe("/user/queue/messages", (message) => {
  //           console.log("Received message: ", message);
  //         });

  //         // Gửi một tin nhắn đến một endpoint
  //         // stompClient.publish({
  //         //   destination: "/app/send", // Endpoint mà server sẽ nhận
  //         //   body: JSON.stringify({ text: "Hello World" }),
  //         // });
  //       },
  //       onStompError: (frame) => {
  //         console.error("STOMP error", frame);
  //       },
  //       onDisconnect: () => {
  //         console.log("Disconnected. Attempting to reconnect...");
  //         setReconnect(true);  // Tạo lại kết nối khi ngắt kết nối
  //       },
  //     });
  //     console.log(BASE_URL_STOMP_CONNECT + "ws")
  //     // Kết nối đến server
  //     stompClient.activate();
  //     setStompClient(stompClient);
  //     setReconnect(false);
  //   }
  // }, [reconnect]);

  // Khởi tạo kết nối WebSocket khi component được mount
  useEffect(() => {
    // Create a new Client instance
    const socket = new Client({
      brokerURL: BASE_URL_STOMP_CONNECT + "ws", // Đảm bảo URL đúng
      onConnect: (frame) => {
        console.log("WebSocket connection established");

        // Gửi message lên server
        // socket.publish({
        //   destination: "/app/authentication", // Endpoint trên server
        //   body: JSON.stringify(access_token),
        // });
        socket.subscribe(
          "/app/authentication",
          (payload) => {
            console.log(payload);
          },
          {
            Authorization: "Bearer " + access_token, // Gửi token xác thực nếu cần
          }
        );
      },
      onDisconnect: () => {
        console.log("Disconnected");
      },
      onStompError: (frame) => {
        console.error("STOMP error: ", frame);
      },
    });

    socket.activate();
    setStompClient(socket);
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
          tabBarLabel: "Updates",
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
