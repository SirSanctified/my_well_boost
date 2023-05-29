import { Stack } from "expo-router";
import { COLORS } from "../constants"
import { Provider } from "../context/auth";

export default function Root() {
  return (
    <Provider>
      <Stack screenOptions={{
        title: '',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: COLORS.bgPrimary}
      }}>
      </Stack>
    </Provider>
  );
}