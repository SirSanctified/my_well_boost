import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
    paddingTop: 100,
  },
  chatContainer: {
    paddingHorizontal: 20,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    backgroundColor: COLORS.bgProfile,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    padding: 15,
    marginTop: 10,
    maxWidth: 320,
  },
  userMessage: {
    alignSelf: 'flex-end',
    textAlign: 'left',
    backgroundColor: COLORS.bgList,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    padding: 15,
    maxWidth: 320,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default chatStyles;
