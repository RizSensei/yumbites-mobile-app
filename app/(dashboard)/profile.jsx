import React from 'react'
import { ThemedView, ThemedText } from '../../components/theme'
import { StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'

const Profile = () => {
  return (
    <ThemedView safeArea={true}>
      <ThemedText>Profile</ThemedText>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  link: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});