/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { Tabs, useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants';
import { logoutUser } from '../../utils';
import { useAuth } from '../../context/auth';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: COLORS.bgPrimary,
          tabBarInactiveBackgroundColor: COLORS.bgList,
          tabBarActiveTintColor: '#111',
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: { fontSize: 14 },
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.bgPrimary },
          headerTransparent: true,
          headerLeft: () => (
            isLoading ? <ActivityIndicator size="small" color={COLORS.btnColor} /> : null
          ),
          headerRight: () => (
            <AntDesign
              name="logout"
              size={32}
              onPress={async () => {
                await logoutUser(user?.id, user.token, logout, setIsLoading, router);
              }}
              color={COLORS.btnColor}
              style={{ paddingHorizontal: 20 }}
            />
          ),
          headerRightContainerStyle: {
            marginRight: 20,
          },
          tabBarStyle: {
            borderTopWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
            height: 60,
            borderTopColor: COLORS.btnColor,
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard/Dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: () => <AntDesign name="appstore1" size={32} color={COLORS.btnColor} />,
          }}
        />
        <Tabs.Screen
          name="history/History"
          options={{
            title: 'History',
            tabBarIcon: () => <FontAwesome name="history" size={32} color={COLORS.btnColor} />,
          }}
        />
        <Tabs.Screen
          name="account/index"
          options={{
            title: 'Account',
            tabBarIcon: () => <FontAwesome name="user" size={32} color={COLORS.btnColor} />,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
