import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS } from "../../constants";

export default function AppLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
       screenOptions={{
        tabBarInactiveTintColor: COLORS.bgPrimary,
        tabBarInactiveBackgroundColor: COLORS.bgList,
        tabBarActiveTintColor: '#111',
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {fontSize: 14},
        headerShown: false
       }}
      >
        <Tabs.Screen name="dashboard/Dashboard" options={{ title: 'Dashboard', tabBarIcon: () => <FontAwesome name="home" size={32} color={COLORS.btnColor} />}} />
        <Tabs.Screen name="history/History" options={{ title: 'History', tabBarIcon: () => <FontAwesome name="history" size={32} color={COLORS.btnColor} />}} />
        <Tabs.Screen name="account/index" options={{ title: 'Account', tabBarIcon: () => <FontAwesome name="user" size={32} color={COLORS.btnColor} />}} />
      </Tabs>
    </SafeAreaProvider>
  );
}