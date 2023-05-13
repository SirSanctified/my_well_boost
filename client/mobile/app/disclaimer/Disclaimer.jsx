import { View, Text, Image, Switch, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { disclaimerStyles } from './disclaimer.styles'
import { Button } from '../../components/Button/Button'
import { COLORS, images } from '../../constants'

const Disclaimer = () => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [isAgreed, setIsAgreed] = useState(false)
  const handleChange = () => {
    setIsAgreed(!isAgreed)
    setIsDisabled(!isDisabled)
  }
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={ disclaimerStyles.container }>
        <Image 
          source={ images.warning }
          resizeMode='contain'
          style={ disclaimerStyles.image }
        />
        <View style={ disclaimerStyles.body }>
          <Text style={ disclaimerStyles.headertext }>Disclaimer</Text>
          <Text style={ disclaimerStyles.contentText }>This application is intended to provide general guidance on health and wellness planning and is not intended to be a substitute for professional medical advice. By using this application, you acknowledge that the information provided is intended for informational and educational purposes only. The health and wellness plans provided in this application should not be considered medical advice or a substitute for professional medical advice, diagnosis, or treatment. We cannot and do not guarantee that any plans provided by this application will be suitable for your particular health needs. We will not be held responsible for any decisions or actions taken based on the information provided in this application.</Text>

          <View style={ disclaimerStyles.switchContainer }>
            <Switch 
            trackColor={{ false: '#767577', true: COLORS.bgPrimary }}
              thumbColor={ isAgreed ? COLORS.btnColor : '#f4f3f4' }
              value={isAgreed}
              onValueChange={handleChange}
            />
            <Text style={ disclaimerStyles.switchText }>I have read and agree to the disclaimer</Text>
          </View>
        </View>
        {isDisabled 
          ? <View style={ disclaimerStyles.buttonDisabled }>
            <Button
              title={ 'Continue' }
              handlePress={() => {}}
              isDisabled={ isDisabled }
            />
          </View>
          : <View style={ disclaimerStyles.buttonEnabled }>
            <Button
              title={ 'Continue' }
              handlePress={() => { router.push('/profileData/ProfileData')}}
              isDisabled={ isDisabled }
            />
          </View>
        }
      </View>
    </SafeAreaView>
  )
}

export default Disclaimer