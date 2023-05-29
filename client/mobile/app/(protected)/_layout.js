import { Tabs } from "expo-router";
import Dashboard from "./dashboard/Dashboard";
import History from "./history/History";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AppLayout() {
  return (
    <SafeAreaProvider>
      <Tabs>
        <Tabs.Screen name="dashboard/Dashboard" options={{ title: 'Dashboard', headerShown: false}} />
        <Tabs.Screen name="history/History" options={{ headerShown: false, title: 'History'}} />
      </Tabs>
    </SafeAreaProvider>
  );
}