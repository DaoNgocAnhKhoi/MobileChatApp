import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeSecond() {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#C7F4F7', '#D1F4F6', '#E5F4F5', '#37D6F8', '#00CCF9']} style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.title}>GROW</Text>
      <Text style={[styles.title, styles.subtitle]}>YOUR BUSINESS</Text>
      <Text style={styles.description}>
        We will help you to grow your business using online server
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SIGN   UP</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.nextText} onPress={() =>{
        navigation.navigate('HomeSecond');
      }}>
        Next
      </Text>
      <Text style={styles.nextText} onPress={() =>{
        navigation.goBack();
      }}>
        Back
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 50,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "transparent",
    borderWidth: 12,
    borderColor: "#000",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    marginTop: -100, // Adjust this value as needed
  },
  description: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    backgroundColor: "#ffc107",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  nextButton: {
    backgroundColor: "#ffc107",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  nextText: {
    marginTop: -90,
    fontSize: 18,
    color: "#000",
  },
});
