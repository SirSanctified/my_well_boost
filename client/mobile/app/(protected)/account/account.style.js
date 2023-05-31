import { StyleSheet } from "react-native"
import { COLORS } from '../../../constants'

export const accountStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.bgPrimary
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: -10,
    backgroundColor: COLORS.bgProfile,
    borderRadius: 5,
    width: '100%',
    height: 45
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: "center",
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  updateButton: {
    width: 150,
    height: 40,
    backgroundColor: COLORS.btnColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: 150,
    height: 40,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 20,
  },
  historyInput: {
    backgroundColor: COLORS.bgProfile,
    color: '#111',
    width: 380,
    height: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  bottomText: {
    fontStyle: 'italic',
    marginVertical: 10
  }
})