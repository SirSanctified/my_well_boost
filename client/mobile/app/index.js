import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { View, SafeAreaView, Text } from 'react-native'

import { Welcome } from './Welcome/Welcome'
import styles from '../styles/index.styles'


const Home = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={styles.container}>
        <Welcome 
          handlePress={ () => router.push("/signup/SignUp") }
        />
      </View>
    </SafeAreaView>
  )
}

export default Home