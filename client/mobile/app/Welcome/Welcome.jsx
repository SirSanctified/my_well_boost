import { View, Text, Image } from 'react-native'
import { welcomeStyles } from './welcome.styles'
import { images } from '../../constants'
import { Button } from '../../components/Button/Button'

const Welcome = ({ handlePress }) => {
  return (
    <>
      <View style={ welcomeStyles.container }>
        <Image 
          source={ images.home }
          resizeMode='contain'
          style={ welcomeStyles.image }
        />
        <Text style={ welcomeStyles.headerText }>Welcome to MyWellBoost</Text>
        <Text style={ welcomeStyles.contentText }>Boost your wellness with our state-of-the-art health and wellness plan builder! MyWellBoost uses Artificial Intelligence to provide you with natural language summaries of recommended lifestyle modifications tailored to your health needs and goals.</Text>
        <View style={ welcomeStyles.btn }>
          <Button 
            title={ 'Get Started'}
            handlePress={ handlePress }
            isDisabled={ false }
          />
        </View>
      </View>
    </>
  )
}

export { Welcome }