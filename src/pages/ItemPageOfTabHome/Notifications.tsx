import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Card, List, Divider, Button, Paragraph, Title, useTheme } from "react-native-paper";
import { RootState } from "../../configuration/redux";
import { acceptFriendRequest, declineFriendRequest, FriendEntity, cancelFriendRequest } from "../../features/friendsSlice";
import { AppDispatch } from "../../configuration/redux";
import { fetchAllUsersExceptSelf } from "../../features/authenticationSlice";
import { fetchFriendRequests } from "../../features/friendsSlice";
import { deleteReceivedRequest } from "../../features/friendsSlice";
import { deleteBlacklist, addBlacklist } from "../../features/friendsSlice";
export default function Notifications() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authentication.user);
  const access_token = useSelector((state: RootState) => state.authentication.access_token);
  const { sent_request, received_request } = useSelector((state: RootState) => state.friends);
  
  const { colors } = useTheme(); // Get the current theme colors
  // Handle Sent Request Withdrawal
  const handleWithdrawRequest = async (requestId: string, friendId: string) => {
    await dispatch(cancelFriendRequest({ requestId, access_token: access_token }));
    // dispatch(deleteBlacklist(friendId));
  };

  // Handle Received Request Acceptance
  const handleAcceptRequest = (requestId: string, friendId: string) => {
    dispatch(acceptFriendRequest({ requestId, access_token: access_token }));
    // dispatch(deleteReceivedRequest(requestId));
    // dispatch(addBlacklist(friendId));
  };

  // Handle Received Request Rejection
  const handleRejectRequest = async (requestId: string, friendId: string) => {
    await dispatch(declineFriendRequest({ requestId, access_token: access_token }));
    // dispatch(deleteBlacklist(friendId));
  };

  const renderSentRequestList = (requests: FriendEntity[]) => (
    <Card style={[styles.card, { backgroundColor: colors.background }]}>
      <Card.Title title="Sent Requests" subtitle={`${requests.length} request(s)`} />
      <Divider />
      <Card.Content>
        {requests.length === 0 ? (
          <Paragraph style={[styles.noRequestsText, { color: colors.onSurface }]}>No sent requests.</Paragraph>
        ) : (
          requests.map((request) => (
            <List.Item
              key={request.id}
              title={`${request.fullNameUser2}`}
              description="Pending"
              left={() => <List.Icon icon="account" style={styles.icon} />}
              right={() => (
                <Button
                  mode="outlined"
                  onPress={() => handleWithdrawRequest(request.id, request.userId2)}
                  style={[styles.withdrawButton, { borderColor: colors.primary }]}
                  labelStyle={{ color: colors.primary }}
                >
                  Withdraw
                </Button>
              )}
              style={styles.listItem}
            />
          ))
        )}
      </Card.Content>
    </Card>
  );

  const renderReceivedRequestList = (requests: FriendEntity[]) => (
    <Card style={[styles.card, { backgroundColor: colors.background }]}>
      <Card.Title title="Received Requests" subtitle={`${requests.length} request(s)`} />
      <Divider />
      <Card.Content>
        {requests.length === 0 ? (
          <Paragraph style={[styles.noRequestsText, { color: colors.onSurface }]}>No received requests.</Paragraph>
        ) : (
          requests.map((request) => (
            <List.Item
              key={request.id}
              title={`${request.fullNameUser2}`}
              description="Pending"
              left={() => <List.Icon icon="account" style={styles.icon} />}
              right={() => (
                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    onPress={() => handleAcceptRequest(request.id, request.userId1)}
                    style={[styles.button, styles.acceptButton, { backgroundColor: colors.primary }]}
                    labelStyle={{ color: colors.background }}
                  >
                    Accept
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => handleRejectRequest(request.id, request.userId1)}
                    style={[styles.button, styles.rejectButton, { borderColor: colors.error }]}
                    labelStyle={{ color: colors.error }}
                  >
                    Reject
                  </Button>
                </View>
              )}
              style={styles.listItem}
            />
          ))
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Title style={[styles.heading, { color: colors.onSurface }]}>Notifications</Title>
      <ScrollView>
        {/* Render Sent Requests */}
        {renderSentRequestList(sent_request)}

        {/* Render Received Requests */}
        {renderReceivedRequestList(received_request)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
    borderRadius: 15,
    elevation: 5,
  },
  noRequestsText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
  },
  listItem: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginVertical: 5,
    width: 120,
  },
  acceptButton: {
    marginHorizontal: 8,
  },
  rejectButton: {
    marginHorizontal: 8,
  },
  withdrawButton: {
    borderRadius: 5,
  },
});
