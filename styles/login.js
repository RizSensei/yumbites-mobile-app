import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const loginStyles = StyleSheet.create({
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: Colors.primary, marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
  formContainer: { width: '100%' },
  forgotPasswordContainer: { alignSelf: 'flex-end', marginTop: 8 },
  forgotPasswordText: { fontSize: 14, color: Colors.primary, fontWeight: '500' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  divider: { flex: 1, height: 1, backgroundColor: '#e0e0e0' },
  dividerText: { paddingHorizontal: 16, fontSize: 14, color: '#999' },
  socialContainer: { width: '100%' },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  registerText: { fontSize: 16, color: '#666' },
  registerLink: { fontSize: 16, color: Colors.primary, fontWeight: 'bold', marginLeft: 4 },
});
