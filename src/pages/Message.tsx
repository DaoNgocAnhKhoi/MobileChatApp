import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Container from "../components/Container";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { StompContext } from "./ItemPageOfTabHome/StompContext";
import { useSendMessageMutation } from "../apiSlice/apiMessage";
import { MessageEntity } from "./ItemPageOfTabHome/Chat";
import { useSelector } from "react-redux";
import { RootState } from "../configuration/redux";

export function Message({ route }: any) {
  const navigation = useNavigation();
  const theme = useTheme();
  const { colors } = theme;
  const { friendId, friendName } = route.params;
  const context = useContext(StompContext);
  if (!context) {
    throw new Error("ComponentA must be used within a MyContextProvider");
  }
  const { stompClient, setStompClient } = context;
  const {user,access_token } = useSelector((state: RootState) => state.authentication);
  const message = useRef<MessageEntity>({
    content: "",
    senderId: user?.id,
    receiverId: friendId,
    isRead: false,
    createdAt: null,
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: friendName ? friendName : "",
    });
  }, [navigation, friendName]);
  const handleSendMessage = async (newMessage: MessageEntity) => {
    try {
      // Gửi message tới server với destination
      stompClient?.publish({
        destination: "/app/send-message",
        headers:{
          Authorization: "Bearer " + access_token, 
        },
        body: JSON.stringify({
          senderId: newMessage.senderId,
          receiverId: newMessage.receiverId,
          content: newMessage.content,
          createdAt: new Date(),
        }),
        
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  const handleChangeMessage = (text: string) => {
    message.current.content = text;
  };
  return (
    <Container>
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
    </Container>
  );
}
const styles = StyleSheet.create({
  containerSearch: {
    width: " 95%",
    marginTop: 120,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "2.5%",
  },
});
