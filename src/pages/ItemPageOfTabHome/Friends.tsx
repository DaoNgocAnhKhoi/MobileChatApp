import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView 
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  useTheme,
  FAB,
  Portal,
  Dialog,
  Button,
  Text,
  Card,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useGetListFriendsStatusQuery } from "../../apiSlice/apiFriends";
import { AppDispatch, RootState } from "../../configuration/redux";
import { ItemFriendOnline } from "../../components/ItemFriendOnline";
import { UserInformations } from "../../features/authenticationSlice";
import { FriendRequest, sendFriendRequest } from "../../features/friendsSlice";
import { MessageEntity } from "./Chat";
import { generateObjectId } from "../../utils/generatedObjectId";
import { deleteUserFromList } from "../../features/authenticationSlice";
import { addBlacklist } from "../../features/friendsSlice";

export default function Friends() {
  const [modalVisible, setModalVisible] = useState(false);
  const [friendUsers, setFriendUsers] = useState<UserInformations[]>([]);
  const [email, setEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserInformations[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { colors } = theme;
  const user = useSelector((state: RootState) => state.authentication.user);
  const users = useSelector((state: RootState) => state.authentication.users);
  const { friends, blacklist } = useSelector((state: RootState) => state.friends);
  const access_token = useSelector((state: RootState) => state.authentication.access_token);
  
  useEffect(() => {
    if (user?.id && Array.isArray(friends) && Array.isArray(users)) {
      const friendList = friends
        .filter((friend) => friend.userId1 === user?.id || friend.userId2 === user?.id)
        .map((friend) => {
          const friendUserId = friend.userId1 === user?.id ? friend.userId2 : friend.userId1;
          return users.find((user) => user.id === friendUserId);
        })
        .filter(Boolean); // Filter out null/undefined users

      setFriendUsers(friendList.filter((user): user is UserInformations => user !== undefined));
    }
  }, [user?.id, friends, users]);

  useEffect(() => {
    if (email && Array.isArray(users) && Array.isArray(user?.listFriendsId)) {
      const filtered = users.filter((u) => 
        u.email.toLowerCase().includes(email.toLowerCase()) &&
        !user?.listFriendsId.includes(u.id) &&  // Exclude users that are already in the listFriendsId
        !blacklist.includes(u.id) // Exclude users that are in the blacklist
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [email, users, user?.listFriendsId, blacklist]);
  const handleAddFriend = (email: string, idFriend: string) => {
    const msg: MessageEntity = {
      id: generateObjectId(),
      senderId: user?.id || "",
      receiverId: idFriend,
      content: "Friend request message",
      createdAt: new Date().toISOString(),
      isRead: false
    }

    const friendRequest: FriendRequest = {
      email: email,
      message: msg,
      friendId: idFriend,
    }

    console.log("friendRequest",friendRequest);
    dispatch(sendFriendRequest({ friendRequest: friendRequest, access_token: access_token }));
  };

  return (
    <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 16, paddingTop: 60 }}>
      {/* Search Bar */}
      <View style={[styles.containerSearch, { marginBottom: 20, backgroundColor: colors.surface }]}>
        <AntDesign name="search1" size={25} style={{ marginLeft: 10, color: colors.onSurface }} />
        <TextInput
          placeholder="Search by user name"
          style={{
            marginLeft: 10,
            color: colors.onBackground,
            flex: 1,
            height: 40,
          }}
          placeholderTextColor={colors.onSurfaceDisabled}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      {/* Friends List */}
      <FlatList
        style={{ flex: 1 }}
        data={friendUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemFriendOnline key={item.id} friend={item} />}
      />

      {/* Add Friend Modal */}
      <Portal>
        <FAB
          style={[styles.fab, { backgroundColor: colors.primary }]}
          icon="plus"
          onPress={() => setModalVisible(true)}
        />

        <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)} style={styles.modal}>
          <Dialog.Title>Add Friend</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.primary,
                paddingVertical: 10,
                marginBottom: 10,
                color: colors.onSurface,
              }}
              placeholder="Enter friend's email"
              placeholderTextColor={colors.onSurfaceDisabled}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            
            {/* FlatList with fixed height for the modal */}
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card style={[styles.userCard, { backgroundColor: colors.surface }]}>
                  <Card.Content>
                    <Text style={[styles.userName, { color: colors.onSurface }]}>
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text style={[styles.userEmail, { color: colors.onSurfaceDisabled }]}>
                      {item.email}
                    </Text>
                    <Text style={[styles.userGender, { color: colors.onSurfaceDisabled }]}>
                      {item.gender === "male" ? "Male" : "Female"} |{" "}
                      {new Date(item.birthDate).toLocaleDateString()}
                    </Text>
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      mode="contained"
                      onPress={() => handleAddFriend(item.email, item.id)}
                      style={[styles.addButton, { backgroundColor: colors.primary }]}
                    >
                      Add Friend
                    </Button>
                  </Card.Actions>
                </Card>
              )}
              style={styles.flatList}
              contentContainerStyle={styles.flatListContainer}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalVisible(false)} color={colors.primary}>
              Close
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSearch: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#f0f0f0",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    margin: 16,
  },
  modal: {
    maxHeight: 500, // Limiting the height of the modal
    marginHorizontal: 16,
  },
  flatList: {
    maxHeight: 300, // Adjust the height of FlatList for the modal
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  userCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#777",
  },
  userGender: {
    fontSize: 12,
    color: "#555",
  },
  addButton: {
    marginTop: 5,
    backgroundColor: "#4CAF50",
  },
});
