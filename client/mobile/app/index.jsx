/* eslint-disable no-use-before-define */
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { COLORS } from '../constants';

export default function App() {
  return (
    <SafeAreaView style={style.container}>
      <ActivityIndicator size="large" color={COLORS.btnColor} />
      <FlashMessage position="bottom" />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgPrimary,
  },
});
