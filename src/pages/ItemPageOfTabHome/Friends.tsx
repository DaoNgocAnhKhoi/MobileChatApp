import {
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

export default function Friends() {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Container style={{ justifyContent: "flex-start", marginTop: 20 }}>
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
      <View style={{ flex: 1, marginTop: 20 }}>
        <View
          style={{
            height: 40,
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <View>
            <Image
              style={[styles.iconAvt, { marginTop: 0 }]}
              source={require("../../../images/app/pngtree-character-default-avatar-png-image_5407167.jpg")}
            />
            <View style={{ position: "absolute", bottom: -3, right: -3 }}>
              <DotStatus status="online" />
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
            name
          </Text>

          <Text style={[styles.time, { color: colors.onSurface }]}>6 giờ</Text>
        </View>
      </View>
    </Container>
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
