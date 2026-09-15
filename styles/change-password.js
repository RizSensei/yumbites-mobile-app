import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const changePasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    color: Colors.primary,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.light.text,
    fontSize: 15,
    lineHeight: 22,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
  },
});
