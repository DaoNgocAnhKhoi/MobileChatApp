import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Notifications from './Notifications';
import Profile from './Profile';
import { useTheme } from 'react-native-paper';
import Chat from './Chat';
import Friends from './Friends';
const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen() {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      barStyle={{backgroundColor:colors.primary}}
      activeColor={colors.onBackground}
      inactiveColor={colors.background}
    >
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat-processing" color={color} size={26} />
          ),
        }}
       
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-friends" color={color} size={26} />
          ),
        }} />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

