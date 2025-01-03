import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Container from "../../components/Container";
import { useTheme } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../configuration/redux";
import { useGetAllFriendsByUserIdQuery } from "../../apiSlice/apiFriends";
import { useEffect } from "react";
import { timeDifference } from "../../utils/format";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FriendEntity, setFriends } from "../../features/friendsSlice";
import { fetchAllUsersExceptSelf } from "../../features/authenticationSlice";
import { fetchFriendRequests } from "../../features/friendsSlice";
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// {
//   "id": "673ad5a052fc225d8e1574e6",
//   "userId1": "6738703341ec8344ccf95617",
//   "fullNameUser1": "Doe John ",
//   "userId2": "673963f7fdc5da48b3743ab3",
//   "fullNameUser2": "Doe John ",
//   "message": null,
//   "createdAt": "2024-11-18T12:50:24.317",
//   "updatedAt": "2024-11-18T12:50:24.317"
// }
interface Friend {
  id: string;
  userId1: string;
  fullNameUser1: string;
  userId2: string;
  fullNameUser2: string;
  message: MessageEntity | null;
}
// private Long id;

// private String content;

// private String senderId;

// private String receiverId;

// @CreatedDate
// private LocalDateTime createdAt;
export interface MessageEntity {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string | null;
  isRead: boolean;
}
interface ItemListFriendProps {
  friend: Friend;
}

export default function Chat() {
  const theme = useTheme();
  const { colors } = theme;
  const user = useSelector((state: RootState) => state.authentication.user);
  const users = useSelector((state: RootState) => state.authentication.users);
  const access_token = useSelector((state: RootState) => state.authentication.access_token);
  const { friends }: { friends: FriendEntity[] } = useSelector(
    (state: RootState) => state.friends
  );
  const dispatch: AppDispatch = useDispatch();


useEffect(() => {
  const fetchData = async () => {
    // Chờ fetchAllUsersExceptSelf hoàn tất
    await dispatch(fetchAllUsersExceptSelf({
      access_token: access_token as string, 
      userId: user?.id as string 
    }));

    // Sau khi fetchAllUsersExceptSelf hoàn thành, mới gọi fetchFriendRequests
    dispatch(fetchFriendRequests({
      access_token: access_token as string
    }));
  };

  fetchData();
}, []);


  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemListFriend key={item.id} friend={item} />}
        ListHeaderComponent={
          <View>
            <View
              style={[
                {
                  backgroundColor: colors.primary,
                },
                styles.header,
              ]}
            >
              <Image
                style={styles.iconAvt}
                source={require("../../../images/app/pngtree-character-default-avatar-png-image_5407167.jpg")}
              />
              <Text style={[styles.userName, { color: colors.onSurface }]}>
                {user ? user.firstName + " " + user.lastName : ""}
              </Text>
            </View>
            <View style={styles.containerSearch}>
              <AntDesign
                name="search1"
                size={25}
                style={{ marginLeft: 10, color: colors.onBackground }}
              />
              <TextInput
                placeholder="Search by user name"
                style={{ marginLeft: 10, color: colors.onBackground, flex: 1 }}
              />
            </View>
          </View>
        }
      />
    </View>
  );
}
function ItemListFriend({ friend }: { friend: Friend }) {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const { colors } = theme;
  const user = useSelector((state: RootState) => state.authentication.user);

  const handleMovePageMessage = (
    friendId: string,
    friendName: String,
    id: string
  ) => {
    navigation.navigate("Message", {
      friendId: friendId,
      friendName: friendName,
      id: id,
    });
  };
  return (
    <TouchableOpacity
      style={{ display: "flex", flex: 1, marginTop: 15 }}
      onPress={() => {
        user?.id === friend.userId1
          ? handleMovePageMessage(
              friend.userId2,
              friend.fullNameUser2,
              friend.id
            )
          : handleMovePageMessage(
              friend.userId1,
              friend.fullNameUser1,
              friend.id
            );
      }}
    >
      <View
        style={[
          styles.containerItemMessage,
          { backgroundColor: colors.background },
        ]}
      >
        <Image
          style={[styles.iconAvt, { marginTop: 0 }]}
          source={require("../../../images/app/pngtree-character-default-avatar-png-image_5407167.jpg")}
        />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            height: 70,
            width: "70%",
          }}
        >
          <Text
            style={[
              styles.userName,
              {
                color: colors.onSurface,
                fontWeight: 500,
                textAlignVertical: "top",
                marginLeft: 10,
                height: 30,
              },
            ]}
          >
            {user?.id === friend.userId1
              ? friend.fullNameUser2
              : friend.fullNameUser1}
          </Text>
          <Text
            style={[
              styles.itemMessage,
              {
                color: colors.onSurface,
                fontWeight:
                  friend.message?.senderId === user?.id ||
                  friend.message?.isRead
                    ? 300
                    : 800,
              },
            ]}
          >
            {friend.message?.senderId === user?.id
              ? "You send: "
              : "Friend send:"}
            {friend.message ? friend.message.content : ""}
          </Text>
        </View>
        <Text
          style={[
            styles.containerItemMessage_time,
            { color: colors.onSurface },
          ]}
        >
          {friend.message && friend.message?.createdAt
            ? timeDifference(new Date(friend.message?.createdAt))
            : ""}
        </Text>
      </View>
    </TouchableOpacity>
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
  itemMessage: {
    fontWeight: 300,
    marginLeft: 10,
  },
  containerItemMessage: {
    width: "95%",
    height: 70,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    // justifyContent: "space-between",
  },
  containerItemMessage_time: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  userName: {
    color: "#FFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    height: 50,
    textAlignVertical: "center",
  },
  header: {
    height: 100,
    width: "100%",
    alignItems: "flex-end",
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
    paddingBottom: 10,
  },
  iconAvt: {
    width: 50,
    height: 50,
    borderRadius: 35,
    borderWidth: 2,
    marginLeft: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
