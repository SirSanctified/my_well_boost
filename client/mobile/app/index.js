import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { View, SafeAreaView, Text } from 'react-native'

import Welcome from './Welcome/Welcome'
import styles from '../styles/index.styles'


const Home = () => {
  const router = useRouter()
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Welcome />
      </View>
    </SafeAreaView>
  )
}