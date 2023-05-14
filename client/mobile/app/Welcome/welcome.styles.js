import { StyleSheet } from 'react-native'

const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 70,
    marginBottom: 30,
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginVertical: 8
  },
  contentText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20
  },
  image: {
    width: 245,
    height: 223,
    marginTop: '20%'
  },
  btn: {
    marginTop: 50
  }
})

export { welcomeStyles }