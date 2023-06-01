import { StyleSheet } from 'react-native';

import { COLORS } from '../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgPrimary,
    flex: 1,
    padding: 8,
  },
  profileContainer: {
    marginTop: 30,
    width: 388,
    height: 268,
    backgroundColor: COLORS.bgProfile,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileText: {
    fontSize: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
