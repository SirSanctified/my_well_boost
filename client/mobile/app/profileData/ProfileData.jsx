import { SafeAreaView, View, Text, Image } from 'react-native'
import { useRouter } from 'expo-router'
import InputText from '../../components/InputText/InputText'
import { Button } from '../../components/Button/Button'
import { COLORS, images } from '../../constants'

import { profileDataStyles } from './profileData.styles'

const ProfileData = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            handleOnChange={() => {}}
            textValue={''}
            autoFocus={true}
          />
          <InputText
            placeholder='Middle Name (Optional)'
            handleOnChange={() => {}}
            autoFocus={false}
            textValue={''}
          />
          <InputText
            placeholder='Last Name'
            handleOnChange={() => {}}
            autoFocus={false}
            textValue={''}
          />
          <InputText
            placeholder='Gender'
            handleOnChange={() => {}}
            autoFocus={false}
            textValue={''}
          />
          <InputText
            placeholder='Date of Birth (YYYY-MM-DD)'
            handleOnChange={() => {}}
            autoFocus={false}
            textValue={''}
          />
        </View>
        <View style={ profileDataStyles.buttonContainer }>
          <Button
            title={'Submit'}
            handleOnPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileData