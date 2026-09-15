import { StyleSheet, useColorScheme, View } from "react-native";
import {
  useSafeAreaInsets
} from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

const ThemedView = ({ children, style, safeArea = false }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  if (!safeArea) {
    return <View style={style}>{children}</View>;
  }

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        style,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default ThemedView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  dark: {
    backgroundColor: Colors.dark.background,
  },
  light: {
    backgroundColor: Colors.light.background,
  },
});
