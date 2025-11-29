import React from "react";
import { StyleSheet, View } from "react-native";

const Spacer = ({ height =40, width = "100%" }) => {
  return <View style={{ height: height, width: width }} />;
};

export default Spacer;

const styles = StyleSheet.create({});