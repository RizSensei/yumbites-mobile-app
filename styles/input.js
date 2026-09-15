import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const inputStyles = StyleSheet.create({
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
