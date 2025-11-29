import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const DashboardLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.primary, tabBarInactiveTintColor: Colors.text }}>
      <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} /> }} />
      <Tabs.Screen name="inbox" options={{ title: "Inbox", tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "mail" : "mail-outline"} color={color} size={size} /> }} />
      <Tabs.Screen name="cart" options={{ title: "Cart", tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "cart" : "cart-outline"} color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} /> }} /> 
      <Tabs.Screen name="more" options={{ title: "More", tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "ellipsis-horizontal" : "ellipsis-horizontal-outline"} color={color} size={size} /> }} />
    </Tabs>
  );
};

export default DashboardLayout;
