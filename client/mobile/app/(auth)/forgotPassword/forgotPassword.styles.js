import { StyleSheet } from 'react-native'
import { COLORS } from '../../../constants'

const forgotPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.bgPrimary
  },
  image: {
    width: 320,
    height:273,
    marginTop: 12
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  inputContainer: {
    marginVertical: 12
  }
})

export { forgotPasswordStyles }