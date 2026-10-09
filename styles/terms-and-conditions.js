import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const termsAndConditionsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#F45B43',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  eyebrow: {
    color: '#FFE6D6',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 8,
  },
  intro: {
    color: '#FFF8F2',
    fontSize: 14,
    lineHeight: 21,
  },
  updated: {
    color: '#FFE6D6',
    fontSize: 12,
    marginTop: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  sectionNumber: {
    color: '#D94A34',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: Colors.light.title,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 9,
  },
  body: {
    color: Colors.light.text,
    fontSize: 14,
    lineHeight: 22,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 9,
  },
  bullet: {
    color: Colors.primary,
    fontSize: 18,
    lineHeight: 21,
    marginRight: 9,
  },
  bulletText: {
    flex: 1,
    color: Colors.light.text,
    fontSize: 14,
    lineHeight: 22,
  },
  contactCard: {
    backgroundColor: '#FFF0E8',
    borderRadius: 18,
    padding: 18,
    marginTop: 2,
  },
  contactTitle: {
    color: '#D94A34',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  contactText: {
    color: Colors.light.text,
    fontSize: 14,
    lineHeight: 22,
  },
  contactEmail: {
    color: '#D94A34',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
});
