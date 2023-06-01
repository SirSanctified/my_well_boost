import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const accountStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.bgPrimary,
    paddingTop: 100,
  },
  inputContainer: {
    width: '100%',
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
    height: 45,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
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
    backgroundColor: '#f5055f',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  historyInput: {
    backgroundColor: COLORS.bgProfile,
    color: '#111',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: '100%',
    minWidth: 300,
    minHeight: 40,
    textAlignVertical: 'center',
  },
  bottomText: {
    fontStyle: 'italic',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default accountStyles;
