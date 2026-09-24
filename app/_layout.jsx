import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import QueryProvider from "../providers/query-provider";
import { AuthProvider } from "../contexts/auth-context";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <>
      <StatusBar value="auto" />
      <QueryProvider>
        <AuthProvider>
          <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.text,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          <Stack.Screen name="(general)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(more)" options={{ headerShown: false }} />
          <Stack.Screen name="(profile)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </QueryProvider>
    </>
  );
};

export default RootLayout;
