import { SafeAreaView, View, Text, Image, ActivityIndicator} from 'react-native'
import { useRouter, Stack, useLocalSearchParams } from 'expo-router'
import { historyStyles } from './history.styles'
import { images, COLORS } from '../../../constants'
import InputText from '../../../components/InputText/InputText'
import { Button } from '../../../components/Button/Button'
import styles from '../../../styles/index.styles'
import { useState } from 'react'
import { createRecommendation } from '../../../utils'
import { useAuth } from '../../../context/auth'


const History = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [history, setHistory] = useState('')
  const [goals, setGoals] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const userId = user.id
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={ historyStyles.container}>
        <View style={ styles.profileContainer}>
          <Image
            style={ styles.profileImage}
            source={ images.defaultProfile }
            resizeMode='contain'
          />
          <Text style={ styles.profileText}>{user.firstName} {user.lastName}</Text>
        </View>
        <View style={ historyStyles.historyContainer}>
          <Text style={ historyStyles.headerText }>Let's work on getting your lifestyle and health history and your goals.</Text>
          <InputText 
            placeholder={ 'Brief us on your health and wellness history' }
            handleOnChange={ (text) => { text === '' ? setHistory(''): setHistory(text)} }
            textValue={ history }
            autoFocus={ true }
            lines={ 5 }
          />
          <InputText 
            placeholder={ 'What are your health goals?' }
            handleOnChange={ (text) => { text === '' ? setGoals('') : setGoals(text)} }
            textValue={ goals }
            autoFocus={ false }
            lines={ 5 }
          />
        </View>
        <View style={ historyStyles.buttonContainer}>
          <Button
            title={ 'Submit' }
            handlePress={ async() => {
              if (history !== '' && goals !== '') {
                await createRecommendation(history, goals, userId, token, setIsLoading, router)
              } else {
                Alert.alert('','Please fill in all fields so we can help you better')
              }
            }
            }
            isDisabled={ false }
          />
          <Text style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{ isLoading ? <ActivityIndicator size='large' color={ COLORS.btnColor } /> : null }</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default History