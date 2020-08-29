import React, { FunctionComponent as Component, useState, useEffect } from "react";
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import HomeScreen from "../screens/HomeScreen";
import LocationScreen from "../screens/LocationScreen";
import RestroDetails from '../screens/RestroDetails'



enableScreens();
const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="RestroDetails" component={RestroDetails} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}