import { Text, View, Avatar } from 'react-native';
export default function Profile() {
  return (
    <View>
      <View>
      <Avatar.Image size={150} source={require("../assets/book.png")} />
      </View>
    </View>
  );
}