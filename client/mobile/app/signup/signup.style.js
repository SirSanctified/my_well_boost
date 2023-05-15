import { StyleSheet } from "react-native"
import { COLORS } from "../../constants"

const signUpStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgPrimary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
    width: 331,
    height: 200,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    marginTop: 30,
  },
  bottomText: {
    marginTop: 10,
    marginBottom: 30
  },
  linkText: {
    color: COLORS.btnColor,
    fontWeight: '900',
  }
})

export { signUpStyles }