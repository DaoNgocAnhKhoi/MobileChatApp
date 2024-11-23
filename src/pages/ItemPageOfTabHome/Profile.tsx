import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../configuration/redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
import { useState } from "react";
import UserDetailsEdit from "../../components/UserDetailsEdit";
import PasswordEdit from "../../components/PasswordEdit";
import { logout } from "../../features/authenticationSlice";

const EDIT_USER_INFORMATION = "user_information";
const EDIT_ACCOUNT_INFORMATION = "account_information";
const DEFAULT = "default";
export default function Profile() {
  const theme = useTheme();
  const { colors } = theme;
  const {user, access_token} = useSelector((state: RootState) => state.authentication);
  const [editView, setEditView] = useState(DEFAULT);
  const handleBack = () => {
    setEditView(DEFAULT);
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout=()=>{
    dispatch(logout(access_token));
  }
  return (
    <View style={{ flex: 1 }}>
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
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity style={{marginRight: 20}}
            onPress={()=>{
              handleLogout();
            }}
            >
              <Text style={{ textDecorationLine: "underline",height:50, textAlignVertical:'center', color:colors.onBackground }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {editView === DEFAULT ? (
        <View
          style={{
            marginTop: 120,
            margin: 30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <TouchableOpacity
            style={{
              height: 100,
              width: 120,
              borderRadius: 5,
              borderWidth: 1,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: colors.inversePrimary,
              borderColor: colors.background,
            }}
            onPress={() => {
              setEditView(EDIT_USER_INFORMATION);
            }}
          >
            <Entypo name="user" size={30} color={colors.background} />
            <Text
              style={{ textAlign: "center", fontWeight: 600, color: "white" }}
            >
              Edit user informations
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 100,
              width: 120,
              borderRadius: 5,
              borderWidth: 1,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: colors.inversePrimary,
              borderColor: colors.background,
            }}
            onPress={() => {
              setEditView(EDIT_ACCOUNT_INFORMATION);
            }}
          >
            <Entypo name="lock" size={30} color={colors.background} />
            <Text
              style={{ textAlign: "center", fontWeight: 600, color: "white" }}
            >
              Edit user informations
            </Text>
          </TouchableOpacity>
        </View>
      ) : editView === EDIT_USER_INFORMATION ? (
        <UserDetailsEdit handleBack={handleBack} />
      ) : editView === EDIT_ACCOUNT_INFORMATION ? (
        <PasswordEdit handleBack={handleBack} />
      ) : (
        ""
      )}
    </View>
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
