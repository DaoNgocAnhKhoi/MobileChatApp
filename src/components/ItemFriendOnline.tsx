import { Image, StyleSheet, Text, View } from "react-native";
import { FriendEntity } from "../features/friendsSlice";
import DotStatus from "./DotSatus";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../configuration/redux";
import { timeDifference } from "../utils/format";
import { useEffect } from "react";
import { UserInformations } from "../features/authenticationSlice";

export function ItemFriendOnline({ friend }: { friend: UserInformations }) {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.authentication.user);
  const { colors } = theme;
  console.log(friend)
  console.log("mess: "+friend.updatedAt)
  console.log("mess: " + friend.updatedAt);
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <View
        style={{
          height: 50, 
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <View>
          <Image
            style={[styles.iconAvt, { marginTop: 0 }]}
            source={require("../../images/app/pngtree-character-default-avatar-png-image_5407167.jpg")}
          />
          <View style={{ position: "absolute", bottom: 4, right: 1 }}>
            <DotStatus status={friend.active ? "online" : "offline"} />
          </View>
        </View>
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
          {friend.firstName + " " + friend.lastName}
        </Text>
        {friend.active ? (
          ""
        ) : (
          <Text style={[styles.time, { color: colors.onSurface }]}>
            {timeDifference(
              new Date(new Date(friend.updatedAt))
            )}
          </Text>
        )}
      </View>
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
