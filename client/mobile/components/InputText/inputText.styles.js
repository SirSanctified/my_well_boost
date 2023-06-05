import { StyleSheet } from 'react-native';

const inputTextStyles = StyleSheet.create({
  input: {
    height: 40,
    width: 320,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderBottomWidth: 1,
    borderRadius: 4,
    marginTop: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    minWidth: 350,
    height: 50,
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.4)',
  },
  chatInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 12,
    paddingHorizontal: 10,
    marginHorizontal: 8,
    height: 50,
    width: '80%',
    alignItems: 'center',
    borderColor: 'rgba(73, 1, 95, 0.7)',
  },
});

export default inputTextStyles;
