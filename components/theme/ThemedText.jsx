import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useColorScheme } from 'react-native'


const ThemedText = ({ children, style }) => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light
  return (
    <Text style={[{ color: theme.text }, style]}>{children}</Text>
  );
};

export default ThemedText;