import React from 'react'
import { ThemedView, ThemedText } from '../../components/theme'
import { StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'

const More = () => {
  return (
    <ThemedView safeArea={true}>
      <ThemedText>More</ThemedText>
    </ThemedView>
  )
}

export default More

const styles = StyleSheet.create({
  link: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});