import { SafeAreaView, ScrollView, View, FlatList, Text, Image, Pressable, TextInput, ActivityIndicator } from "react-native"
import {useEffect, useState } from "react"
import axios from "axios"
import {useRouter, useLocalSearchParams } from 'expo-router'
import { dashboardStyles } from "./dashboard.styles"
import { COLORS, images } from "../../../constants"
import styles from '../../../styles/index.styles'
import { getRecommendations } from "../../../utils"
import { useAuth } from "../../../context/auth"


const tdata = []

const ActivityItem = ({ item }) => {
  return (
    <View style={ dashboardStyles.activity }>
      <View style={ dashboardStyles.unselectedRadioButton }></View>
      <View style={ dashboardStyles.activityTextContainer}>
        <Text style={{ width: '100%'}}>{ item }</Text>
      </View>
    </View>
  )
}
const Dashboard = () => {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUserAvailable, setIsUserAvailable] = useState(false)
  const { user } = useAuth()

  useEffect( () => {
    (async () => {
      if (user) {
        setIsUserAvailable(true)
        await getRecommendations(userId, token, setIsLoading, setRecommendations)
      } else {
        setIsUserAvailable(false)
      }
    })()
  }, [])
  const userId = user ? user.id : null
  const token = user ? user.token : null
  
  return (
    ( isUserAvailable ? <SafeAreaView style={{ flex: 1 }}>
      <View style={dashboardStyles.container}> 
        {/* <View style={ styles.profileContainer }>
          <Image 
            source={ images.defaultProfile }
            resizeMode="contain"
            style={ styles.profileImage }
          />
          <Text style={ styles.profileText }>Pritchard Mambambo</Text>
        </View> */}
        <Text style={ dashboardStyles.header }>Your recommended Lifestyle modifications</Text>
        <View style={ dashboardStyles.listContainer }>
          <FlatList
            data={ recommendations }
            renderItem={({item}) => ( <Text style={ dashboardStyles.recommendation }>{ item.trim() }</Text> )}
            keyExtractor={ item => item }
          />
        </View>
        <Text style={ dashboardStyles.header }>Today's Activities</Text>
        <View style={ dashboardStyles.addActivityContainer }>
          <TextInput 
            style={ dashboardStyles.addActivityInput }
            placeholder="Add another activity"
          />
          <Pressable style={ dashboardStyles.addActivityButton }>
            <Text style={ dashboardStyles.btnText }>Add</Text>
          </Pressable>
        </View>
        <View style={{ marginVertical: 20 }}>
          <FlatList 
            data={ tdata }
            renderItem={({ item }) => ( ActivityItem({ item }) )}
            keyExtractor={ item => item }
          />
        </View>
      </View>
    </SafeAreaView>: <View style={dashboardStyles.container}><Text style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{ isLoading ? <ActivityIndicator size='large' color={ COLORS.btnColor } /> : null }</Text></View>)
  )
}

export default Dashboard