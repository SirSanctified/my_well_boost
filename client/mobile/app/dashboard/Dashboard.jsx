import { SafeAreaView, ScrollView, View, FlatList, Text, Image } from "react-native"
import { Stack, useRouter } from 'expo-router'
import { dashboardStyles } from "./dashboard.styles"
import { COLORS } from "../../constants"
import styles from '../../styles/index.styles'

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
      <ScrollView style={dashboardStyles.container}>
        <View style={ styles.profileContainer }></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard