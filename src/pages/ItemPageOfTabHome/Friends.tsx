import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Container from "../../components/Container";
import { useTheme } from "react-native-paper";
import DotStatus from "../../components/DotSatus";
import {
  useGetListFriendsStatusQuery,
} from "../../apiSlice/apiFriends";
import { useSelector } from "react-redux";
import { RootState } from "../../configuration/redux";
import { FriendEntity } from "../../features/friendsSlice";
import { useEffect } from "react";
import { ItemFriendOnline } from "../../components/ItemFriendOnline";
import { UserInformations } from "../../features/authenticationSlice";

export default function Friends() {
  const theme = useTheme();
  const { colors } = theme;
  const user = useSelector((state: RootState) => state.authentication.user);
  const { data, isError, isFetching, isLoading, isSuccess, refetch } =
  useGetListFriendsStatusQuery("");
  
  useEffect(() => {
    refetch();

    const intervalId = setInterval(() => {
      refetch();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <View
      style={{
        justifyContent: "flex-start",
        marginTop: 60,
        flex: 1,
        margin: 20,
      }}
    >
      <TouchableOpacity
        style={[styles.addFriend, { backgroundColor: colors.primary }]}
      >
        <AntDesign name="pluscircleo" size={27} color={colors.onBackground} />
        <Text
          style={{
            color: colors.onBackground,
            textAlign: "center",
            fontSize: 10,
          }}
        >
          Add Friend
        </Text>
      </TouchableOpacity>
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
      <FlatList
        style={{ flex: 1 }}
        data={data as UserInformations[]}
        keyExtractor={(item) => new Date(item.updatedAt).getTime().toString()}
        renderItem={(item) => <ItemFriendOnline friend={item.item} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  time: {
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
  addFriend: {
    height: 68,
    width: 68,
    borderRadius: 34,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  containerSearch: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
