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
import { useEffect, useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import accountApi from "../api/accountApi";
import { changePassword } from "../features/authenticationSlice";

export default function PasswordEdit({ handleBack }: any) {
  const theme = useTheme();
  const { colors } = theme;
  const [contentModal, setContentModal] = useState({
    content: "",
    textButtonLeft: "",
    textButtonRight: "",
    onPressLeft: () => {},
    onPressRight: () => {},
  });
  const [securityPassword, setSecurityPassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState({
    passwordCurrent: "",
    passwordNew: "",
    passwordConfirm: "",
  });
  const { access_token, message } = useSelector(
    (state: RootState) => state.authentication
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = () => {
    setContentModal({
      content: "Save changes?",
      textButtonLeft: "Cancel",
      textButtonRight: "Save",
      onPressLeft: () => setModalVisible(false),
      onPressRight: () => {
        dispatch(
          changePassword({
            passwordCurrent: passwordEdit.passwordCurrent,
            passwordNew: passwordEdit.passwordNew,
            access_token,
          })
        );
      },
    });
    setModalVisible(true);
  };
  useEffect(() => {
    setContentModal({
      content: "Result: " + message,
      textButtonLeft: "",
      textButtonRight: "Close",
      onPressLeft: () => null,
      onPressRight: () => {
        handleBack();
      },
    });
  }, [message]);

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
          marginTop: 10,
          height: 70,
        }}
      >
        <Text style={{ fontSize: 15 }}>Password current:</Text>

        <TextInput
          style={{
            width: "90%",
            fontSize: 16,
            flex: 1,
            paddingLeft: 10,
            height: 32,
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 10,
            borderColor: colors.primary,
          }}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPasswordEdit({ ...passwordEdit, passwordCurrent: text });
          }}
        />
      </View>
      <View
        style={{
          marginTop: 15,
          height: 70,
        }}
      >
        <Text style={{ fontSize: 15 }}>Password new:</Text>

        <View
          style={{
            height: 39,
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 10,
            borderColor: colors.primary,
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              fontSize: 16,
              flex: 1,
              paddingLeft: 10,
              height: 32,
            }}
            secureTextEntry={securityPassword}
            onChangeText={(text) => {
              setPasswordEdit({ ...passwordEdit, passwordNew: text });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSecurityPassword(!securityPassword);
            }}
          >
            <Entypo
              name="eye-with-line"
              size={20}
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        </View>
        
      </View>
      <View
        style={{
          marginTop: 15,
          height: 70,
        }}
      >
        <Text style={{ fontSize: 15 }}>Password confirm:</Text>

        <View
          style={{
            height: 39,
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 10,
            borderColor:
              passwordEdit.passwordNew === passwordEdit.passwordConfirm
                ? colors.primary
                : colors.error,
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              fontSize: 16,
              flex: 1,
              paddingLeft: 10,
              height: 32,
            }}
            secureTextEntry={securityPassword}
            onChangeText={(text) => {
              setPasswordEdit({ ...passwordEdit, passwordConfirm: text });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSecurityPassword(!securityPassword);
            }}
          >
            <Entypo
              name="eye-with-line"
              size={20}
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
          <Text style={{color:colors.error}}>
            {passwordEdit.passwordConfirm != passwordEdit.passwordNew
              ? "Password does not match"
              : ""}
          </Text>
        </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            width: 120,
            height: 35,
            alignItems: "center",
            backgroundColor: colors.primary,
            borderRadius: 10,
            marginTop: 40,
          }}
          onPress={() => {
            handleChange();
          }}
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
            Change
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
              {contentModal.textButtonLeft ? (
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
              ) : (
                ""
              )}
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
