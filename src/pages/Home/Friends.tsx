import { StyleSheet, Text, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Container from "../../components/Container";


export default function Friends() {
  return (
    <Container style={{}}>
      <View style={styles.containerSearch}>
        <AntDesign name="search1" size={25}/>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  containerSearch: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
