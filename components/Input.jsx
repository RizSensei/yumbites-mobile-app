import { Text, TextInput, useColorScheme, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { inputStyles as styles } from '../styles/input';

const Input = ({
  label,
  error,
  secureTextEntry = false,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.uiBackground,
            color: theme.text,
            borderColor: error ? Colors.warning : 'transparent',
            borderWidth: error ? 1 : 0,
          },
        ]}
        placeholderTextColor={theme.iconColor}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {error && (
        <Text style={styles.errorText}>{error.message || error}</Text>
      )}
    </View>
  );
};

export default Input;

