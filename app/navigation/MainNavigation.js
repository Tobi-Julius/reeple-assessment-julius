import React from "react";
import { NavigationContainer as NavContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CurrencyConverter, Home } from "../screens";

const NavStack = createStackNavigator();

export const MainNavigation = () => {
  return (
    <NavContainer>
      <NavStack.Navigator initialRouteName={"Home"}>
        <NavStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="CurrencyConverter"
          component={CurrencyConverter}
          options={{ headerShown: false }}
        />
      </NavStack.Navigator>
    </NavContainer>
  );
};
