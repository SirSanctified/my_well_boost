import { StyleSheet } from "react-native"
import { COLORS } from "../../constants"


export const disclaimerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    width: "95%",
    borderColor: COLORS.btnColor,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#D9D9D9'
  },
  headertext: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16
  },
  contentText: {
    fontSize: 14,
    paddingHorizontal: 10,
    marginBottom: 24,
    lineHeight: 20
  },
  image: {
    width: 222,
    height: 182,
    marginBottom: 24
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  switchText: {
    fontSize: 14,
  },
  switch: {
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonDisabled: {
    marginTop: 24,
    opacity: 0.5
  },
  buttonEnabled: {
    marginTop: 24,
    opacity: 1
  }
})
