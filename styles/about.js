import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 18,
    padding: 28,
    marginBottom: 20,
  },
  logo: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginBottom: 14,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },
  subtitle: {
    color: '#f5f1ff',
    fontSize: 14,
    marginTop: 6,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  },
  sectionTitle: {
    color: Colors.light.title,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  body: {
    color: Colors.light.text,
    fontSize: 14,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
  },
  icon: {
    color: Colors.primary,
  },
  infoText: {
    flex: 1,
    marginLeft: 14,
  },
  infoTitle: {
    color: Colors.light.title,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  version: {
    color: '#999',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
  },
  link: {
    textAlign: 'center',
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
