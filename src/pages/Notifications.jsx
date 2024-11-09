import { Text, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Button } from "react-native-paper";
export default function Notifications() {
  return (
    <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
      <View style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", borderColor: 'blue',borderWidth: 1 , marginVertical: 20, paddingHorizontal: 20, paddingVertical: 10}}>
        <MaterialCommunityIcons size={70} name="camera"></MaterialCommunityIcons>
        <Text style={{fontWeight: 'bold', fontSize: 26, marginLeft: 20}}>Thêm hình ảnh</Text>
      </View>

      <Button
        mode="contained"
        onPress={() => console.log("Pressed")}
        style={{backgroundColor: '#0D5DB6', width: '60%', marginHorizontal: 'auto', marginVertical: 30}}
      >
       GỬI
      </Button>

      <View style={{marginTop: 50}}>
        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}>
          Cực kỳ hài lòng
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Icon key={index} name="star" size={50} color="#FFD700" />
          ))}
        </View>
      </View>

      <View style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", borderColor: 'blue',borderWidth: 1 , marginVertical: 20, paddingHorizontal: 20, paddingVertical: 10}}>
        <MaterialCommunityIcons size={70} name="camera"></MaterialCommunityIcons>
        <Text style={{fontWeight: 'bold', fontSize: 26, marginLeft: 20}}>Thêm hình ảnh</Text>
      </View>

      <View>
        <TextInput
          style={{
            height: 170,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 20,
            padding: 10,
            textAlignVertical: 'top'
          }}
          multiline
          numberOfLines={4}
          placeholder="Chia sẻ những điều mà bạn thích về sản phẩm ở đây"
        />
      </View>

      <Button
        mode="contained"
        onPress={() => console.log("Pressed")}
        style={{backgroundColor: '#0D5DB6', width: '60%', marginHorizontal: 'auto', marginVertical: 30}}
      >
       GỬI
      </Button>
    </View>
  );
}
