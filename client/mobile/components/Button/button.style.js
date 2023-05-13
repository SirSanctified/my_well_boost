import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../constants"


const buttonStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.btnColor,
    width: SIZES.primaryBtnWidth,
    height: SIZES.btnHeight,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: COLORS.btnText,
    fontSize: 14
  }
})

export { buttonStyles }