import { SafeAreaView, View, Text, Image } from "react-native"
import { useRouter } from 'expo-router'
import { Button } from '../../components/Button/Button'
import InputText from '../../components/InputText/InputText'
import { forgotPasswordStyles } from "./forgotPassword.styles"
import { images } from "../../constants"


const ForgotPassword = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            textValue={ '' }
            handleOnChange={() => {}}
          />
        </View>
        <View>
          <Button 
            title={ 'Reset Password' }
            isDisabled={ false }
            handlePress={ () => router.push('/login/Login')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword