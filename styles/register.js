import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const registerStyles = StyleSheet.create({
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: Colors.primary, marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
  formContainer: { width: '100%' },
  passwordRequirements: { marginTop: 12, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0' },
  requirementsTitle: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  requirementItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  requirementText: { fontSize: 12, color: '#666', marginLeft: 8 },
  requirementMet: { color: Colors.primary, fontWeight: '500' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  divider: { flex: 1, height: 1, backgroundColor: '#e0e0e0' },
  dividerText: { paddingHorizontal: 16, fontSize: 14, color: '#999' },
  socialContainer: { width: '100%' },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { fontSize: 16, color: '#666' },
  loginLink: { fontSize: 16, color: Colors.primary, fontWeight: 'bold', marginLeft: 4 },
});
