import { StyleSheet } from 'react-native'

const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginVertical: 8
  },
  contentText: {
    fontSize: 14,
    textAlign: 'center'
  },
  image: {
    width: '60%',
    height: '50%',
  },
  btn: {
    marginVertical: 30
  }
})

export { welcomeStyles }