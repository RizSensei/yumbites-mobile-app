import { StyleSheet } from 'react-native';

export const promoBannerStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 18,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  gradient: {
    paddingHorizontal: 19,
    paddingVertical: 18,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copy: {
    flex: 1,
  },
  eyebrow: {
    color: '#F5C69C',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.3,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 5,
    letterSpacing: -0.4,
  },
  description: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.78)',
    marginBottom: 12,
  },
  cta: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 16,
    backgroundColor: '#FFF4E8',
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  ctaText: {
    color: '#30251F',
    fontSize: 10,
    fontWeight: '800',
  },
  art: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dessert: {
    fontSize: 55,
  },
  discount: {
    position: 'absolute',
    right: -1,
    top: 1,
    backgroundColor: '#FFCB6D',
    borderRadius: 13,
    paddingHorizontal: 7,
    paddingVertical: 5,
    transform: [{ rotate: '8deg' }],
  },
  discountText: {
    color: '#55372D',
    fontSize: 10,
    fontWeight: '900',
  },
});
