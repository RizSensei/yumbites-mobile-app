import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#59483E',
    marginBottom: 7,
  },
  inputWrapper: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F2E9E1',
    backgroundColor: '#FFFCF9',
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 50,
    paddingHorizontal: 3,
    fontSize: 14,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  errorText: {
    color: Colors.warning,
    fontSize: 11,
    marginTop: 5,
  },
});
