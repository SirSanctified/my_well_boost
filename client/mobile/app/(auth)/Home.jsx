import React from 'react';
import { useRouter, Stack } from 'expo-router';
import { View, SafeAreaView } from 'react-native';

import Welcome from './Welcome/Welcome';
import styles from '../../styles/index.styles';
import { COLORS } from '../../constants';

function Home() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.bgPrimary },
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <View style={styles.container}>
        <Welcome
          handlePress={() => router.replace('/login/Login')}
        />
      </View>
    </SafeAreaView>
  );
}

export default Home;
