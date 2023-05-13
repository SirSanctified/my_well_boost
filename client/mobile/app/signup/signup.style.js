import { StyleSheet } from "react-native"
import { COLORS } from "../../constants"

const signUpStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgPrimary,
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  image: {
    marginTop: 127,
    marginBottom: 24,
    width: 331,
    height: 232,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    marginTop: 24,
  },
  bottomText: {
    marginTop: 24,
  },
  linkText: {
    color: COLORS.btnColor,
    fontWeight: '900',
  }
})

export { signUpStyles }