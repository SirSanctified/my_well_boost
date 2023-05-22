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
    height: 150,
    marginVertical: 20,
  },
  body: {
    marginTop: 20,
  },
  headertext: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 16,
  }
})