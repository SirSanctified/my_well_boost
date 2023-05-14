import { SafeAreaView, View, Text, Image} from 'react-native'
import { useRouter } from 'expo-router'
import { historyStyles } from './history.styles'
import { images } from '../../constants'
import InputText from '../../components/InputText/InputText'
import { Button } from '../../components/Button/Button'
import styles from '../../styles/index.styles'


const History = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            handleOnChange={ () => {} }
            textValue={ '' }
            autoFocus={ true }
            lines={ 5 }
          />
          <InputText 
            placeholder={ 'What are your health goals?' }
            handleOnChange={ () => {} }
            textValue={ '' }
            autoFocus={ false }
            lines={ 5 }
          />
        </View>
        <View style={ historyStyles.buttonContainer}>
          <Button
            title={ 'Submit' }
            handlePress={ () => {router.push('/dasboard/Dashboard')} }
            isDisabled={ false }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default History