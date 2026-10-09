import { StyleSheet } from 'react-native';

export const menuCardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#5F4030',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
  },
  imageContainer: {
    position: 'relative',
    height: 126,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 9,
    right: 9,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 20,
    padding: 7,
  },
  content: {
    paddingHorizontal: 11,
    paddingTop: 11,
    paddingBottom: 12,
  },
  name: {
    color: '#30251F',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  description: {
    color: '#8C7D73',
    fontSize: 10,
    lineHeight: 14,
    marginBottom: 10,
    minHeight: 28,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '900',
    color: '#E65D40',
  },
  addButton: {
    backgroundColor: '#30251F',
    borderRadius: 16,
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
