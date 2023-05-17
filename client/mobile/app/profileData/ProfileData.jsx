import { SafeAreaView, View, Text, Image } from 'react-native'
import { useRouter, Stack } from 'expo-router'
import InputText from '../../components/InputText/InputText'
import { Button } from '../../components/Button/Button'
import { COLORS, images } from '../../constants'

import { profileDataStyles } from './profileData.styles'
import { useState } from 'react'

const ProfileData = () => {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')

  const validateDob = (dob) => {
    const dobRegex = /\d{4}-\d{2}-\d{2}/
    return dobRegex.test(dob)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            placeholder='First Name'
            handleOnChange={(text) => { text.trim() === '' ? setFirstName('') : setFirstName(text.trim())}}
            textValue={firstName}
            autoFocus={true}
          />
          <InputText
            placeholder='Middle Name (Optional)'
            handleOnChange={(text) => { setMiddleName(text) }}
            autoFocus={false}
            textValue={ middleName }
          />
          <InputText
            placeholder='Last Name'
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
            handlePress={() => {
              if (firstName!== '' && lastName !== '' && gender !== '' && validateDob(dob)) {
                router.push('/history/History')
                setDob('')
                setFirstName('')
                setGender('')
                setLastName('')
                setMiddleName('')
              } else {
                alert('Please make sure first name, last name, gender and date of birth are not empty')
              }
            }}
            isDisabled={ false }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileData