import { Text, TextInput, useColorScheme, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { inputStyles as styles } from '../styles/input';

const Input = ({
  label,
  error,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.uiBackground,
            borderColor: error ? Colors.warning : 'transparent',
            borderWidth: error ? 1 : 0,
          },
        ]}
      >
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholderTextColor={theme.iconColor}
          secureTextEntry={secureTextEntry}
          {...props}
        />
        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
      </View>
      {error && (
        <Text style={styles.errorText}>{error.message || error}</Text>
      )}
    </View>
  );
};

export default Input;
