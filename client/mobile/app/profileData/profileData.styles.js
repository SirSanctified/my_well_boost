import { StyleSheet } from 'react-native'

import { COLORS } from '../../constants'

export const profileDataStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 300,
    height: 150,
    marginTop: 10,
  },
  body: {
    marginTop: 0,
  },
  headertext: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 0,
  },
  buttonContainer: {
    marginBottom: 16,
  }
})