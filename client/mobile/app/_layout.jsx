/* eslint-disable react/react-in-jsx-scope */
import { Stack } from 'expo-router';
import { COLORS } from '../constants';
import { Provider } from '../context/auth';

export default function Root() {
  return (
    <Provider>
      <Stack screenOptions={{
        title: '',
        headerShadowVisible: false,
        headerShown: false,
        headerStyle: { backgroundColor: COLORS.bgPrimary },
        headerTintColor: COLORS.btnColor,
      }}
      />
    </Provider>
  );
}
