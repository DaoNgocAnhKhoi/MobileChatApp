import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../configuration/redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import accountApi from "../api/accountApi";
import {
  changeUserInformations,
  UserInformations,
} from "../features/authenticationSlice";

export default function UserDetailsEdit({ handleBack }: any) {
  const theme = useTheme();
  const { colors } = theme;
  const { user, access_token } = useSelector(
    (state: RootState) => state.authentication
  );
  const [userInfomationEnable, setUserInfomationEnable] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });
  const [userInformations, setUserInformations] = useState(user);
  const [contentModal, setContentModal] = useState({
    content: "",
    textButtonLeft: "",
    textButtonRight: "",
    onPressLeft: () => {},
    onPressRight: () => {},
  });
  const [enableButtonSave, setEnableButtonSave] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);
  const handleSave = () => {
    setContentModal({
      content: "Save changes?",
      textButtonLeft: "Cancel",
      textButtonRight: "Save",
      onPressLeft: () => setModalVisible(false),
      onPressRight: () => {
        if (enableButtonSave) {
          if (userInformations) {
            dispatch(
              changeUserInformations({ access_token, user: userInformations })
            );
            handleBack();
          }
        }
      },
    });
    setModalVisible(true);
  };
  const handleEnableButtonSave = (state: boolean) => {
    setEnableButtonSave(state);
  };
  return (
    <View style={{ flex: 1, marginTop: 120, marginLeft: 40 }}>
      <TouchableOpacity
        onPress={() => {
          setContentModal({
            content: "Save changes?",
            textButtonLeft: "No",
            textButtonRight: "Yes",
            onPressLeft: () => setModalVisible(false),
            onPressRight: () => handleBack(),
          });
          setModalVisible(true);
        }}
      >
        <AntDesign name="back" size={25} />
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ width: "25%", fontSize: 15 }}>First Name:</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 24,
            marginRight: 24,
            flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            alignItems: "center",
            height: 32,
            borderColor: colors.primary,
          }}
        >
          <TextInput
            style={{ width: "70%", fontSize: 16, flex: 1, paddingLeft: 10 }}
            value={userInformations?.firstName}
            editable={userInfomationEnable.firstName}
            onChangeText={(text) => {
              if (userInformations) {
                setUserInformations({ ...userInformations, firstName: text });
                handleEnableButtonSave(true)
              }
            }}
          />
          <AntDesign
            name="edit"
            size={20}
            color={colors.primary}
            style={{ marginRight: 10 }}
            onPress={() => {
              setUserInfomationEnable({
                ...userInfomationEnable,
                firstName: true,
              });
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 15,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ width: "25%", fontSize: 15 }}>Last Name:</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 24,
            marginRight: 24,
            flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            alignItems: "center",
            height: 32,
            borderColor: colors.primary,
          }}
        >
          <TextInput
            style={{ width: "70%", fontSize: 16, flex: 1, paddingLeft: 10 }}
            value={userInformations?.lastName}
            editable={userInfomationEnable.lastName}
            onChangeText={(text) => {
              if (userInformations) {
                setUserInformations({ ...userInformations, lastName: text });
                handleEnableButtonSave(true)
              }
            }}
          />
          <AntDesign
            name="edit"
            size={20}
            color={colors.primary}
            style={{ marginRight: 10 }}
            onPress={() => {
              setUserInfomationEnable({
                ...userInfomationEnable,
                lastName: true,
              });
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 15,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ width: "25%", fontSize: 15 }}>Email:</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 24,
            marginRight: 24,
            flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            alignItems: "center",
            height: 32,
            borderColor: colors.primary,
          }}
        >
          <TextInput
            style={{ width: "70%", fontSize: 16, flex: 1, paddingLeft: 10 }}
            value={userInformations?.email}
            editable={userInfomationEnable.email}
            onChangeText={(text) => {
              if (userInformations) {
                setUserInformations({ ...userInformations, email: text });
                handleEnableButtonSave(true)
              }
            }}
          />
          <AntDesign
            name="edit"
            size={20}
            color={colors.primary}
            style={{ marginRight: 10 }}
            onPress={() => {
              setUserInfomationEnable({ ...userInfomationEnable, email: true });
            }}
          />
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            width: 120,
            height: 35,
            alignItems: "center",
            backgroundColor: enableButtonSave
              ? colors.primary
              : colors.secondary,
            borderRadius: 10,
            marginTop: 40,
          }}
          onPress={() => {
            handleSave();
          }}
          disabled={!enableButtonSave}
        >
          <Text
            style={{
              fontSize: 16,
              color: colors.onPrimary,
              fontWeight: "bold",
              textAlignVertical: "center",
              height: "100%",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide" // Có thể là "fade", "none", hoặc "slide"
        transparent={true} // Cho phép nền phía sau Modal trong suốt
        visible={modalVisible} // Hiển thị Modal khi trạng thái là true
        onRequestClose={() => {
          // Xử lý khi người dùng nhấn nút back trên Android
          setModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text
              style={{
                textAlign: "left",
                width: "90%",
                marginLeft: "5%",
                fontSize: 18,
              }}
            >
              {contentModal.content}
            </Text>

            {/* Nút đóng Modal */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginLeft: "25%",
                width: "60%",
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 35,
                  backgroundColor: colors.backdrop,
                  borderRadius: 10,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                onPress={() => contentModal.onPressLeft()}
              >
                <Text style={styles.closeButtonText}>
                  {contentModal.textButtonLeft}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 35,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: 30,
                }}
                onPress={() => {
                  contentModal.onPressRight();
                }}
              >
                <Text style={{ color: colors.onPrimary }}>
                  {contentModal.textButtonRight}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Làm nền đen mờ
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
