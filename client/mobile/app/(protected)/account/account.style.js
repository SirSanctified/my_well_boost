import { StyleSheet } from "react-native"
import { COLORS } from '../../../constants'

export const accountStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: COLORS.bgPrimary
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: -10,
    width: 380,
    height: 45
  },
  button: {
    alignItems: "center"
  }
})