import React from 'react'
import { ThemedView, ThemedText } from '../../components/theme'
import { StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'

const Inbox = () => {
  return (
    <ThemedView safeArea={true}>
      <ThemedText>Inbox</ThemedText>
    </ThemedView>
  )
}

export default Inbox

const styles = StyleSheet.create({
  link: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});