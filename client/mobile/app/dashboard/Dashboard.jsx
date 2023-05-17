import { SafeAreaView, ScrollView, View, FlatList, Text, Image, Pressable, TextInput } from "react-native"
import { Stack, useRouter } from 'expo-router'
import { v4 as uuidv4 } from 'uuid'
import { dashboardStyles } from "./dashboard.styles"
import { COLORS, images } from "../../constants"
import styles from '../../styles/index.styles'

const fakeData = [
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, iure!',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, iure!',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, iure!',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, iure!',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, iure!',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, iure!',
]

const tdata = [
  'Lorem ipsum dolor sit amet.',
  'Lorem ipsum dolor sit amet consectetur.',
  'Lorem ipsum dolor sit.',
  'Lorem ipsum dolor sit amet consectetur adipisicing amet.'
]

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.bgPrimary },
          headerShadowVisible: false,
          headerTitle: ''
        }}
      />
      <ScrollView style={dashboardStyles.container} contentContainerStyle={{ alignItems: 'center'}} showsVerticalScrollIndicator={ false }>
        <View style={ styles.profileContainer }>
          <Image 
            source={ images.defaultProfile }
            resizeMode="contain"
            style={ styles.profileImage }
          />
          <Text style={ styles.profileText }>Anny Jay</Text>
        </View>
        <Text style={ dashboardStyles.header }>Your recommended Lifestyle modifications</Text>
        <View style={ dashboardStyles.listContainer }>
          <FlatList 
            data={ fakeData }
            renderItem={ ({ item }) => (<Text style={{ marginVertical: 5 }}>{ item }</Text>) }
            keyExtractor={ item => { item + Math.random() } }
          />
        </View>
        <Text style={ dashboardStyles.header }>Today's Activities</Text>
        <View style={ dashboardStyles.addActivityContainer }>
          <TextInput 
            style={ dashboardStyles.addActivityInput }
            placeholder="Add another activity"
          />
          <Pressable style={ dashboardStyles.addActivityButton }>
            <Text style={ dashboardStyles.btnText }>+</Text>
          </Pressable>
        </View>
        <View style={{ marginVertical: 20 }}>
          <FlatList 
            data={ tdata }
            renderItem={({ item }) => ( ActivityItem({ item }) )}
            keyExtractor={ item => item }
          />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard