import { StyleSheet } from 'react-native'

import { COLORS } from '../../constants'

export const profileDataStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 197.5,
    marginTop: 30,
  },
  body: {
    marginTop: 30,
  },
  headertext: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 30,
  },
  buttonContainer: {
    marginTop: 30,
  }
})