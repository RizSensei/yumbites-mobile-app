import { StyleSheet } from 'react-native';

export const indexStyles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#140a29',
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 5,
    paddingBottom: 42,
  },
  topLabel: {
    color: '#d9cdf0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  brandBlock: {
    alignItems: 'center',
    marginTop: 72,
  },
  mark: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  markInner: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: '#fff',
    fontSize: 46,
    fontWeight: '800',
    letterSpacing: -1,
  },
  tagline: {
    color: '#e7def5',
    fontSize: 16,
    marginTop: 8,
    letterSpacing: 0.2,
  },
  bottomBlock: {
    width: '100%',
  },
  loadingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  loadingText: {
    color: '#f4effb',
    fontSize: 13,
    fontWeight: '600',
  },
  loadingPercent: {
    color: '#cdbbe9',
    fontSize: 12,
    fontWeight: '700',
  },
  progressTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    overflow: 'hidden',
  },
  progressFill: {
    width: '72%',
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  footerText: {
    color: '#b8a6db',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 14,
  },
});
