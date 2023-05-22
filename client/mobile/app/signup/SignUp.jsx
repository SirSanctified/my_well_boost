import { View, Text, SafeAreaView, Image, ScrollView, Alert } from 'react-native'
import { Link, useRouter, Stack } from 'expo-router'
import { useState } from 'react'
import InputText from '../../components/InputText/InputText'
import { Button } from '../../components/Button/Button'
import { signUpStyles } from './signup.style'
import { images, COLORS } from '../../constants'
import { areCredentialsValid } from '../../utils'

const SignUp = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.bgPrimary },
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <View style={ signUpStyles.container }>
        <Image 
          source={ images.signup }
          resizeMode='contain'
          style={ signUpStyles.image }
        />
        <View>
          <Text style={ signUpStyles.headerText }>Welcome to MyWellBoost</Text>
        </View>
        <View>
          <InputText 
            placeholder={ 'Email Address' }
            autoFocus={ true }
            handleOnChange={(text) => { setEmail(text) }}
            textValue={ email }
          />
        </View>
        <View>
          <InputText 
            placeholder={ 'Password (must be 8 characters or more)' }
            autoFocus={ false }
            handleOnChange={(text) => { 
              setPassword(text) 
              }
            }
            textValue={ password }
            password={ true }
          />
        </View>
        <View>
          <InputText 
            placeholder={ 'Confirm Password (must be 8 characters or more)' }
            autoFocus={ false }
            handleOnChange={(text) => { setConfirmPass(text) }}
            textValue={ confirmPass }
            password={ true }
          />
        </View>
        <View style={ signUpStyles.button }>
          <Button 
            title={ 'Register' }
            handlePress={async () => { 
              if (areCredentialsValid(email, password, confirmPass)) {
                router.push({pathname:'/profileData/ProfileData',
                  params: { email: email, password: password }})
              } else {
                setPassword('')
                setConfirmPass('')
              }
            }}
            isDisabled={ false }
          />
        </View>
        <View style={ signUpStyles.bottomText }>
          <Text>Already have an account? <Link href={'/login/Login'} style={ signUpStyles.linkText}>Sign in</Link></Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp