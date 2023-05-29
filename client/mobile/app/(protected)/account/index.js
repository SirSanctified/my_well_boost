import { TextInput, SafeAreaView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../../../context/auth'
import { logoutUser } from '../../../utils'
import { Button } from '../../../components/Button/Button'
import { accountStyles } from './account.style'
import { useRouter } from 'expo-router'

const Account = () => {
  const { logout, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={ accountStyles.container}>
        <Text>Account</Text>
        <View>
          <TextInput 
            placeholder='First Name'
            value={ user?.firstName}
            style={ accountStyles.input}
          />
          <TextInput 
            placeholder='Last Name'
            value={ user?.lastName}
            style={ accountStyles.input}
          />
          <TextInput 
            placeholder='Email'
            value={ user?.email}
            style={ accountStyles.input}
          />
          <TextInput 
            placeholder='Gender'
            value={ user?.gender}
            style={ accountStyles.input}
          />
          <TextInput 
            placeholder='Date Of Birth (YYYY-MM-DD)'
            value={ user?.dateOfBirth}
            style={ accountStyles.input}
          />
        </View>
        <View style={ accountStyles.button }>
          <Button 
            title='Logout'
            handlePress={async () => {
              await logoutUser(user.id, user.token, logout, setIsLoading, router)
            }}
            isDisabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Account
