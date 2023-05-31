import { SafeAreaView, ScrollView, View, FlatList, Text, Image, Pressable, TextInput, ActivityIndicator } from "react-native"
import {useEffect, useState } from "react"
import {useRouter } from 'expo-router'
import { dashboardStyles } from "./dashboard.styles"
import { COLORS } from "../../../constants"
import { getActivities, getRecommendations } from "../../../utils"
import { useAuth } from "../../../context/auth"



const ActivityItem = ({ item }, setIsSelected, isSelected) => {
  return (
    <View style={ dashboardStyles.activity }>
      <View style={ isSelected ? dashboardStyles.selectedRadioButton : dashboardStyles.unselectedRadioButton }></View>
      <View style={ dashboardStyles.activityTextContainer}>
        <Text style={{ width: '100%', lineHeight: 20}} selectable onPress={() => setIsSelected(!isSelected)}>{ item.trim() }</Text>
      </View>
    </View>
  )
}
const Dashboard = () => {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false)
  const [activities, setActivities] = useState([])
  const [isSelected, setIsSelected] = useState()
  const [isUserAvailable, setIsUserAvailable] = useState(false)
  const { user } = useAuth()

  useEffect( () => {
    (async () => {
      if (user) {
        setIsUserAvailable(true)
        await getRecommendations(userId, token, setIsLoading, setRecommendations)
        await getActivities(userId, token, setActivities, setIsActivitiesLoading)
      } else {
        setIsUserAvailable(false)
      }
    })()
  }, [user])
  const userId = user ? user.id : null
  const token = user ? user.token : null
  
  return (
    ( isUserAvailable 
      ? <ScrollView style={{ flex: 1, backgroundColor: COLORS.bgPrimary }} contentContainerStyle={{ alignItems: "center", justifyContent: "center"}}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={dashboardStyles.container}>
          <Text style={ dashboardStyles.header }>Your recommended Lifestyle modifications</Text>
          <View style={ dashboardStyles.listContainer }>
            <FlatList
              data={ recommendations }
              renderItem={({item}) => ( <Text style={ dashboardStyles.recommendation }>{ item.trim() }</Text> )}
              keyExtractor={ item => item }
            />
          </View>
          <Text style={ dashboardStyles.header }>Today's Activities</Text>
          <View style={{ marginTop: 20, marginBottom: 80 }}>
            <FlatList 
              data={ activities }
              renderItem={({ item }) => ( ActivityItem({ item }, setIsSelected, isSelected) )}
              keyExtractor={ item => item }
            />
          </View>
        </View>
      </SafeAreaView>
      </ScrollView>
    :<View style={dashboardStyles.container}><ActivityIndicator size='large' color={ COLORS.btnColor } /></View>)
  )
}

export default Dashboard