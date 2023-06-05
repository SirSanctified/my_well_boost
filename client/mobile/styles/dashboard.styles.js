import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const dashboardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgPrimary,
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  listContainer: {
    backgroundColor: COLORS.bgList,
    width: '98%',
    height: 'auto',
    minHeight: 400,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  recommendation: {
    color: '#000',
    fontSize: 16,
    marginVertical: 5,
    lineHeight: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activity: {
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    marginVertical: 5,
    paddingVertical: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  unselectedRadioButton: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: '#f2f2f2',
    marginRight: 20,
    marginLeft: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  selectedRadioButton: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: COLORS.btnColor,
    marginRight: 20,
    marginLeft: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  activityTextContainer: {
    flexWrap: 'wrap',
    width: '85%',
    height: 'auto',
  },
});

export default dashboardStyles;
