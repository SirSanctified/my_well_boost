import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from 'react-native-vector-icons/AntDesign'
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
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          borderTopColor: COLORS.btnColor,
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,          
        }
       }}
      >
        <Tabs.Screen name="dashboard/Dashboard" options={{ title: 'Dashboard', tabBarIcon: () => <AntDesign name="appstore1" size={32} color={COLORS.btnColor} />}} />
        <Tabs.Screen name="history/History" options={{ title: 'History', tabBarIcon: () => <FontAwesome name="history" size={32} color={COLORS.btnColor} />}} />
        <Tabs.Screen name="account/index" options={{ title: 'Account', tabBarIcon: () => <FontAwesome name="user" size={32} color={COLORS.btnColor} />}} />
      </Tabs>
    </SafeAreaProvider>
  );
}