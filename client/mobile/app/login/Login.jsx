import { SafeAreaView, View, Text, Image } from "react-native"
import { useRouter, Link, Stack } from 'expo-router'
import { useState } from "react"

import { loginStyles } from "./login.styles"
import InputText from '../../components/InputText/InputText'
import { Button } from '../../components/Button/Button'
import { COLORS, images } from "../../constants"
import { isEmailValid } from "../../authUtils"


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1 }}>
     <Stack.Screen 
      options={{
        headerStyle: { backgroundColor: COLORS.bgPrimary },
        headerShadowVisible: false,
        headerTitle: '',
      }}
     /> 
      <View style={ loginStyles.container }>
        <Image 
          source={ images.login }
          resizeMode="contain"
          style={ loginStyles.image }
        />
        <View style={ loginStyles.textContainer }>
          <Text style={ loginStyles.headerText }>Welcome Back</Text>
        </View>
        <View style={ loginStyles.inputContainer }>
          <InputText 
            placeholder={ 'Enter your email address' }
            autoFocus={ true }
            handleOnChange={ (text) => { setEmail(text) } }
            textValue={ email }
          />
          <InputText 
            placeholder={ 'Your password' }
            autoFocus={ false }
            handleOnChange={ (text) => { 
              text.trim() === '' ? setPassword('') : setPassword(text.trim())
              } 
            }
            textValue={ password }
          />
        </View>
        <View style={ loginStyles.forgotPasswordContainer}>
          <Text style={ loginStyles.linkText}><Link href={'/forgotPassword/ForgotPassword'} style={ loginStyles.link}>Forgot password?</Link></Text>
        </View>
        <View style={ loginStyles.buttonContainer }>
          <Button 
            title={ 'Sign in'}
            isDisabled={ false }
            handlePress={ () => {
              if (isEmailValid(email) && password.trim() !== '') {
                router.push('/dashboard/Dashboard')
                setEmail('')
                setPassword('')
              } else {
                alert('Please enter a valid email and password')
                setPassword('')
              }
            } }
          />
        </View>
        <View style={ loginStyles.bottomTextContainer }>
          <Text style={ loginStyles.bottomText }>Don't have an account? <Link href={'/signup/SignUp'} style={ loginStyles.linkText }>Register</Link></Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login