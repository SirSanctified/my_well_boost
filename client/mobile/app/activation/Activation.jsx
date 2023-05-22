import { SafeAreaView, View, Text, ActivityIndicator, Alert } from "react-native"
import { Button } from "../../components/Button/Button"
import InputText from "../../components/InputText/InputText"
import { activate } from '../../utils'

import { COLORS } from "../../constants"
import { useRouter } from "expo-router"
import { useState } from "react"
import { activationStyles } from "./activation.styles"

const Activation = () => {
  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={ activationStyles.container}>
        <Text>
          Enter the 8-digit activation code you received from your email in the textbox below
        </Text>
        <View>
          <InputText 
            placeholder={'Enter your activation token here'}
            textValue={token}
            handleOnChange={(text) => { text?.trim() ? setToken(text.trim()) : setToken('') }}
            autoFocus={true}
            password={false}
          />
        </View>
        <View>
          <Button 
            title={'Activate Account'}
            isDisabled={false}
            handlePress={async() => {
              if(token.length === 8) {
                await activate(token, setIsLoading, router)
              } else {
                Alert.alert('', 'The token must be 8 characters long')
              }
            }}
          />
          <Text style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{ isLoading ? <ActivityIndicator size='large' color={ COLORS.btnColor } /> : null }</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Activation
