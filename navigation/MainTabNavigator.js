import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import Comercios from "../screens/Comercios";
import Login from "../screens/Login";


const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "ios-home"
      }
    />
  )
};

const Screen1Stack = createStackNavigator({
  Screen1: Comercios
});

Screen1Stack.navigationOptions = {
  tabBarLabel: "Comercios",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-business"}
    />
  )
};

const LoginStack = createStackNavigator({
  Screen2: Login
});

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "ios-log-in"}
    />
  )
};



export default createBottomTabNavigator({
  HomeStack,
  Screen1Stack,
  LoginStack,
  
});

// stackNavigator  https://www.youtube.com/watch?v=4-jYaenYMMk
