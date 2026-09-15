import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const addressesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
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
  list: {
    marginBottom: 20,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
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
    backgroundColor: '#f0eafd',
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
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },
  defaultButton: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 14,
    paddingTop: 12,
  },
  defaultButtonText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});
