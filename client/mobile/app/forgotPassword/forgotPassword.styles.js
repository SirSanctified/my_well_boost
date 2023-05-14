import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants'

const forgotPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.bgPrimary
  },
  image: {
    width: 320,
    height:273,
    marginTop: 30
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  inputContainer: {
    marginVertical: 30
  }
})

export { forgotPasswordStyles }