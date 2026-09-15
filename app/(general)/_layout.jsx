import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const GeneralLayout = () => {
  return (
    <>
    
    <StatusBar value="auto" />
    <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
    </>
  );
};

export default GeneralLayout;
