import React from 'react'
import { ThemedView, ThemedText } from '../../components/theme'
import { StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'

const About = () => {
  return (
    <ThemedView safeArea={true}>
      <ThemedText>About</ThemedText>
    </ThemedView>
  )
}

export default About

const styles = StyleSheet.create({
  link: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});