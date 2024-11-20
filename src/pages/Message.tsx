import { useNavigation } from "@react-navigation/native";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Container from "../components/Container";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { StompContext } from "./ItemPageOfTabHome/StompContext";
import { useSendMessageMutation } from "../apiSlice/apiMessage";
import { MessageEntity } from "./ItemPageOfTabHome/Chat";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../configuration/redux";
import { addMessage, addOldMessageStartCreatedAt, getMessages } from "../features/messageSlice";
import ItemMessage from "../components/ItemMessage";
import { changeMessageNewInFriend } from "../features/friendsSlice";
interface M {
  id: number;
  text: string;
}
export function Message({ route }: any) {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { colors } = theme;
  const { friendId, friendName } = route.params;
  const context = useContext(StompContext);
  const dateSend = useRef({ date: new Date() });
  const flatListRef = useRef<FlatList<any>>(null);
  if (!context) {
    throw new Error("ComponentA must be used within a MyContextProvider");
  }
  const { stompClient, setStompClient } = context;
  const { user, access_token } = useSelector(
    (state: RootState) => state.authentication
  );
  const messages: MessageEntity[] = useSelector(
    (state: RootState) => state.messages.messages
  );
  const message = useRef<MessageEntity>({
    content: "",
    senderId: user?.id ? user.id : "",
    receiverId: friendId,
    isRead: false,
    createdAt: null,
  });
  useEffect(() => {
    // Tự động cuộn xuống cuối khi messages thay đổi
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, []); // Khi messages thay đổi
  const [currentTime, setCurrentTime] = useState(Date.now());
  // Cập nhật lại state mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval); // Dọn dẹp interval khi unmount
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: friendName ? friendName : "",
      headerStyle: {
        backgroundColor: colors.primary,
      },
    });
  }, [friendName]);
  useEffect(()=>{
    console.log("messagesmessagesmessagesmessages")
    console.log(messages.length)
  },[messages])
  useEffect(() => {
    if (friendId && user && user.id) {
      dispatch(
        getMessages({
          friendId,
          userId: user.id,
          access_token,
          createdAt: new Date(),
        })
      );
    }
  }, [friendId]);
  const handleLoadMessageOldByCreatedAt = (
    friendId: string,
    userId: string,
    access_token: string,
    createdAt: Date
  ) => {
    console.log(createdAt)
    dispatch(
      addOldMessageStartCreatedAt({
        friendId,
        userId,
        access_token,
        createdAt,
      })
    );
  };
  const handleSendMessage = async (newMessage: MessageEntity) => {
    try {
      // Gửi message tới server với destination
      newMessage.createdAt = new Date().toISOString();
      stompClient?.publish({
        destination: "/app/send-message",
        headers: {
          Authorization: "Bearer " + access_token,
        },
        body: JSON.stringify({
          senderId: newMessage.senderId,
          receiverId: newMessage.receiverId,
          content: newMessage.content,
          createdAt: newMessage.createdAt,
        }),
      });
      dispatch(addMessage(newMessage));
      if (user && user?.id) {
        const info = {
          friendId: newMessage.receiverId, // The friend ID
          userId: user?.id, // User ID (default empty if user is undefined)
          access_token: access_token, // Access token for authentication
          message: newMessage, // The message object
        };
        dispatch(changeMessageNewInFriend(info));
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  const handleChangeMessage = (text: string) => {
    message.current.content = text;
  };
  const setDateSend = (date: Date) => {
    dateSend.current.date = date;
  };

  return (
    <View style={[{ flex: 1 }, { backgroundColor: colors.background }]}>
      <FlatList
        ref={flatListRef} // Gán ref vào FlatList
        style={{ flex: 1, width: "100%" }}
        data={messages}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <ItemMessage
            message={item}
            pathAvt=""
            dateSend={dateSend.current.date}
            setDateSend={setDateSend}
          />
        )}
        inverted
        onEndReached={() => {
          console.log("loading...");

          if (user && messages[messages.length - 1]) {
            const createdAt = messages[messages.length - 1]?.createdAt;
            if (createdAt) {
              handleLoadMessageOldByCreatedAt(
                friendId,
                user?.id,
                access_token,
                new Date(createdAt)
              );
            }
          }
        }}
      />
      <View style={styles.containerSearch}>
        <TextInput
          placeholder="Search by user name"
          style={{ marginLeft: 10, color: colors.onBackground, flex: 1 }}
          onChangeText={(text) => {
            handleChangeMessage(text);
          }}
        />
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => {
            handleSendMessage(message.current);
          }}
        >
          <Feather
            name="send"
            size={25}
            style={{ marginLeft: 10, color: colors.onBackground }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerSearch: {
    width: " 95%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "2.5%",
    marginBottom: 30,
  },
});
