import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import { useTheme } from "react-native-paper";
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Chat() {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Container style={{ paddingHorizontal: 0 }}>
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
          User Name
        </Text>
      </View>
      <View style={{ display: "flex", flex: 1, marginTop: 100 }}>
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
              name
            </Text>
            <Text style={[styles.itemMessage, { color: colors.onSurface }]}>
              name
            </Text>
          </View>
          <Text
            style={[
              styles.containerItemMessage_time,
              { color: colors.onSurface },
            ]}
          >
            6 giờ
          </Text>
        </View>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
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
