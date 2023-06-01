import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const historyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 100,
  },
  historyContainer: {
    marginTop: 12,
    width: '100%',
  },
  headerText: {
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 50,
  },
});

export default historyStyles;
