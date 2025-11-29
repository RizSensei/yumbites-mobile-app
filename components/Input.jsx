import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

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

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: {
    color: Colors.warning,
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;

