import { SafeAreaView, View, Text, Image } from "react-native"
import { useRouter, Stack } from 'expo-router'
import { Button } from '../../components/Button/Button'
import InputText from '../../components/InputText/InputText'
import { forgotPasswordStyles } from "./forgotPassword.styles"
import { images, COLORS } from "../../constants"
import { useState } from "react"
import { isEmailValid } from "../../authUtils"


const ForgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.bgPrimary },
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <View style={ forgotPasswordStyles.container }>
        <Image 
          source={ images.forgot }
          resizeMode="contain"
          style={ forgotPasswordStyles.image }
        />
        <View style={{ marginTop: 30 }}>
          <Text style={ forgotPasswordStyles.headerText }>Reset Password</Text>
          <View style={{ marginTop: 30 }}>
            <Text style={ forgotPasswordStyles.bodyText }>Please enter your email address and we will send you an email containing the instructions on how to reset your password.</Text>
            <Text style={ forgotPasswordStyles.bodyText }><Text style={ forgotPasswordStyles.boldText }>Note</Text>: Use the email address you registered with.</Text>
          </View>
        </View>
        <View style={ forgotPasswordStyles.inputContainer }>
          <InputText 
            autoFocus={ true }
            placeholder={ 'Enter your email address' }
            handleOnChange={(text) => {setEmail(text)}}
            textValue={ email }
          />
        </View>
        <View>
          <Button 
            title={ 'Reset Password' }
            isDisabled={ false }
            handlePress={ () => {
              if (isEmailValid(email)) {
                router.push('/login/Login')
              } else {
                alert('Please enter a valid email address')
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword