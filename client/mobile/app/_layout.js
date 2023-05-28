import { Stack } from 'expo-router'
import { COLORS } from '../constants'

const Layout = () => {
  return (
    <Stack screenOptions={{
      title:'',
      headerStyle: { backgroundColor: COLORS.bgPrimary },
      headerShadowVisible: false,
    }}/>
  )
}

export default Layout