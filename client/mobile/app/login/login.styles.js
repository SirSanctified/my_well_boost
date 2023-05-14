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
    marginTop: 50,
  },
  textContainer: {
    marginTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  inputContainer: {
    marginTop: 30
  },
  buttonContainer: {
    marginTop: 30
  },
  forgotPasswordContainer: {
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.btnColor,
    textDecorationLine: 1,
    color: COLORS.btnColor,
    fontSize: 14
  },
  linkText: {
    fontWeight: 'bold',
    color: COLORS.btnColor,
  },
  bottomTextContainer: {
    marginTop: 30
  },
  bottomText: {
    fontSize: 14
  }
})

export { loginStyles }