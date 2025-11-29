import React from 'react'
import { ThemedView, ThemedText } from '../../components/theme'
import { StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'

const Cart = () => {
  return (
    <ThemedView safeArea={true}>
      <ThemedText>Cart</ThemedText>
    </ThemedView>
  )
}

export default Cart

const styles = StyleSheet.create({
  link: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});