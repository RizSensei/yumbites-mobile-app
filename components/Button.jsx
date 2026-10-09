import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { buttonStyles as styles } from '../styles/button';

const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  leftIcon,
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
        <View style={styles.content}>
          {leftIcon}
          <Text style={getTextStyle()}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
