import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  ...props
}) => {
  const isDisabled = disabled || loading;

  const getButtonStyle = () => {
    if (variant === 'secondary') {
      return [styles.button, styles.secondaryButton, isDisabled && styles.disabled];
    }
    return [styles.button, styles.primaryButton, isDisabled && styles.disabled];
  };

  const getTextStyle = () => {
    if (variant === 'secondary') {
      return [styles.text, styles.secondaryText];
    }
    return [styles.text, styles.primaryText];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? Colors.primary : '#fff'} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: Colors.primary,
  },
});

export default Button;

