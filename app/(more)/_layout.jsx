import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const MoreLayout = () => {
  return (
    <>
    
    <StatusBar value="auto" />
    <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
    </>
  );
};

export default MoreLayout;
