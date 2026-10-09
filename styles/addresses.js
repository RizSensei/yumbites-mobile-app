import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const addressesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: '#34261F',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.light.text,
    fontSize: 15,
    lineHeight: 22,
  },
  list: {
    marginBottom: 20,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F5EADF',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0E8',
    marginRight: 12,
  },
  addressDetails: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    color: Colors.light.title,
    fontSize: 16,
    fontWeight: '700',
  },
  defaultBadge: {
    backgroundColor: '#e8f5ed',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  defaultBadgeText: {
    color: '#287a47',
    fontSize: 11,
    fontWeight: '600',
  },
  address: {
    color: Colors.light.text,
    fontSize: 14,
    lineHeight: 20,
  },
  details: {
    color: '#A3978F',
    fontSize: 13,
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },
  defaultButton: {
    borderTopWidth: 1,
    borderTopColor: '#F5EADF',
    marginTop: 14,
    paddingTop: 12,
  },
  defaultButtonText: {
    color: '#D94A34',
    fontSize: 13,
    fontWeight: '600',
  },
});
