import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const buttonStyles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  primaryButton: {
    backgroundColor: '#E85D40',
    shadowColor: '#B74631',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#FFFCF9',
    borderWidth: 1,
    borderColor: '#F0E4D9',
    shadowOpacity: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 14,
    fontWeight: '800',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#30251F',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
