import { Image, StyleSheet, Text, View } from "react-native";
import { Avatar, Card, IconButton, useTheme } from "react-native-paper";
import DotStatus from "./DotSatus";
import { useSelector } from "react-redux";
import { RootState } from "../configuration/redux";
import { timeDifference } from "../utils/format";
import { UserInformations } from "../features/authenticationSlice";
import { removeFriend } from "../features/friendsSlice";
import { deleteFriend } from "../features/friendsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../configuration/redux";
import { deleteBlacklist } from "../features/friendsSlice";

export function ItemFriendOnline({ friend }: { friend: UserInformations }) {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.authentication.user);
  const access_token = useSelector((state: RootState) => state.authentication.access_token);
  const { colors } = theme;
  const dispatch = useDispatch<AppDispatch>();

  // Function to handle deleting a friend
  const handleDeleteFriend = () => {
    dispatch(removeFriend({ access_token: access_token, friendId: friend.id }));
  };

  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          {/* Avatar */}
          <Avatar.Image
            size={50}
            source={require("../../images/app/pngtree-character-default-avatar-png-image_5407167.jpg")}
            style={styles.avatar}
          />
          <View style={styles.statusDot}>
            {/* Dot for online/offline status */}
            <DotStatus status={friend.active ? "online" : "offline"} />
          </View>
        </View>

        {/* Name and Last Seen Time */}
        <View style={styles.infoContainer}>
          <Text style={[styles.userName, { color: colors.onSurface }]}>
            {friend.firstName} {friend.lastName}
          </Text>
          {!friend.active && (
            <Text style={[styles.time, { color: colors.onSurface }]}>
              {timeDifference(new Date(friend.updatedAt))}
            </Text>
          )}
        </View>

        {/* Icon button for deleting friend */}
        <IconButton
          icon="delete"
          size={30}
          iconColor={colors.error} // Red color for delete action
          onPress={handleDeleteFriend}
          style={styles.deleteButton}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  statusDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: "italic",
  },
  deleteButton: {
    marginLeft: "auto",
  },
});
