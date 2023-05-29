import { View, Text, Image, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { useRouter, Stack, useLocalSearchParams } from 'expo-router'
import InputText from '../../../components/InputText/InputText'
import { Button } from '../../../components/Button/Button'
import { COLORS, images } from '../../../constants'

import { profileDataStyles } from './profileData.styles'
import { useState } from 'react'
import { signUp } from '../../../utils'

const ProfileData = () => {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { email, password } = useLocalSearchParams()

  const validateDob = (dob) => {
    const dobRegex = /\d{4}-\d{2}-\d{2}/
    return dobRegex.test(dob)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.bgPrimary },
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <View style={ profileDataStyles.container }>
        <Image
          source={ images.profileData }
          resizeMode='contain'
          style={ profileDataStyles.image }
        />
        <View style={ profileDataStyles.body }>
          <Text style={ profileDataStyles.headertext }>Let us know you better</Text>
        </View>
        <View style={ profileDataStyles.inputContainer }>
          <InputText
            placeholder='First Name (must be more than 3 characters)'
            handleOnChange={(text) => { text.trim() === '' ? setFirstName('') : setFirstName(text.trim())}}
            textValue={firstName}
            autoFocus={true}
          />
          <InputText
            placeholder='Last Name (must be more than 3 characters)'
            handleOnChange={(text) => { text.trim() === '' ? setLastName('') : setLastName(text.trim())}}
            autoFocus={false}
            textValue={lastName}
          />
          <InputText
            placeholder='Gender'
            handleOnChange={(text) => { text.trim() === '' ? setGender('') : setGender(text.trim())}}
            autoFocus={false}
            textValue={ gender }
          />
          <InputText
            placeholder='Date of Birth (YYYY-MM-DD)'
            handleOnChange={(text) => { text.trim() === '' ? setDob('') : setDob(text)}}
            autoFocus={false}
            textValue={dob}
          />
        </View>
        <View style={ profileDataStyles.buttonContainer }>
          <Button
            title={'Submit'}
            handlePress={async () => {
              if (firstName.length > 3 && lastName.length > 3 && gender.length > 3 && validateDob(dob)) {
                // signup user
                await signUp(
                  firstName, lastName, email, password, dob, gender, setIsLoading, router
                )
              } else {
                Alert.alert('','Please make sure first name, last name, gender and date of birth are not empty')
              }
            }}
            isDisabled={ false }
          />
          <Text style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{ isLoading ? <ActivityIndicator size='large' color={ COLORS.btnColor } /> : null }</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ProfileData