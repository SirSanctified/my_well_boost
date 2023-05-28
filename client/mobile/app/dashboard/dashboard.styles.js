import { StyleSheet } from "react-native"
import { COLORS } from "../../constants"

const dashboardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgPrimary,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20
  },
  listContainer: {
    backgroundColor: COLORS.bgList,
    width: '95%',
    height: 250,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  recommendation: {
    color: '#000',
    fontSize: 16,
    marginVertical: 5,
    lineHeight: 20,
  },
  activity: {
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    marginVertical: 5,
    paddingVertical: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  unselectedRadioButton: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: '#f2f2f2',
    marginRight: 20,
    marginLeft: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  selectedRadioButton: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: COLORS.btnColor,
    marginRight: 20,
    marginLeft: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  activityTextContainer: { 
    flexWrap: 'wrap', 
    width: '85%', 
    height: 'auto'
  },
  addActivityContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: "row",
    width: '95%'
  },
  addActivityInput: {
    width: 321,
    height: 40,
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center'
  },
  addActivityButton: {
    borderRadius: 10,
    backgroundColor: '#d9d9d9',
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: COLORS.btnColor,
  }
})

export { dashboardStyles }