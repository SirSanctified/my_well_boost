import { View, Text, SafeAreaView, Image } from 'react-native'
import { Link, useRouter } from 'expo-router'

import InputText from '../../components/InputText/InputText'
import { Button } from '../../components/Button/Button'
import { signUpStyles } from './signup.style'
import { images } from '../../constants'

const SignUp = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            handleOnChange={() => {}}
            textValue={ '' }
          />
        </View>
        <View>
          <InputText 
            placeholder={ 'Password' }
            autoFocus={ false }
            handleOnChange={() => {}}
            textValue={ '' }
          />
        </View>
        <View>
          <InputText 
            placeholder={ 'Confirm Password' }
            autoFocus={ false }
            handleOnChange={() => {}}
            textValue={ '' }
          />
        </View>
        <View style={ signUpStyles.button }>
          <Button 
            title={ 'Register' }
            handlePress={() => { router.push('/disclaimer/Disclaimer')}}
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