import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants'

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: COLORS.bgPrimary
  },
  image: {
    width: 388,
    height: 197,
    marginTop: 30,
  },
  textContainer: {
    marginTop: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  inputContainer: {
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 0
  },
  forgotPasswordContainer: {
    marginVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.btnColor,
    textDecorationLine: 'underline',
    color: COLORS.btnColor,
    fontSize: 14,
  },
  linkText: {
    fontWeight: 'bold',
    color: COLORS.btnColor,
  },
  bottomTextContainer: {
    marginTop: 10
  },
  bottomText: {
    fontSize: 14
  }
})

export { loginStyles }