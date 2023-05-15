import { StyleSheet } from "react-native"
import { COLORS } from "../../constants"

const dashboardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgPrimary,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10
  },
  listContainer: {
    backgroundColor: COLORS.bgList,
    width: '95%',
    borderRadius: 10,
    padding: 10,
  }
})

export { dashboardStyles }