import { SafeAreaView, View, Text, Image} from 'react-native'
import { useRouter, Stack } from 'expo-router'
import { historyStyles } from './history.styles'
import { images, COLORS } from '../../constants'
import InputText from '../../components/InputText/InputText'
import { Button } from '../../components/Button/Button'
import styles from '../../styles/index.styles'
import { useState } from 'react'


const History = () => {
  const router = useRouter()
  const [history, setHistory] = useState('')
  const [goals, setGoals] = useState('')
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.bgPrimary },
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <View style={ historyStyles.container}>
        <View style={ styles.profileContainer}>
          <Image
            style={ styles.profileImage}
            source={ images.defaultProfile }
            resizeMode='contain'
          />
          <Text style={ styles.profileText}>Anny Jay</Text>
        </View>
        <View style={ historyStyles.historyContainer}>
          <Text style={ historyStyles.headerText }>Let's work on getting your lifestyle and health history and your goals.</Text>
          <InputText 
            placeholder={ 'Brief us on your health and wellness history' }
            handleOnChange={ (text) => { text.trim() === '' ? setHistory(''): setHistory(text.trim())} }
            textValue={ history }
            autoFocus={ true }
            lines={ 5 }
          />
          <InputText 
            placeholder={ 'What are your health goals?' }
            handleOnChange={ (text) => { text.trim() === '' ? setGoals('') : setGoals(text.trim())} }
            textValue={ goals }
            autoFocus={ false }
            lines={ 5 }
          />
        </View>
        <View style={ historyStyles.buttonContainer}>
          <Button
            title={ 'Submit' }
            handlePress={ () => {
              if (history !== '' && goals !== '') {
                router.push('/dashboard/Dashboard')
                setGoals('')
                setHistory('')
              } else {
                alert('Please fill in all fields so we can help you better')
              }
            }
            }
            isDisabled={ false }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default History