// Routes.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import Chat from "../screens/Chat";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
} from "../context/AuthenticatedUserContext";
import { auth } from "../../config/firebase";
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator
      defaultScreenOptions={Home}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ChatStack" component={ChatStack} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setLoading(false);
      }
    );
    return unsubscribeAuth;
  }, [auth]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <AuthenticatedUserProvider>
      <NavigationContainer>
        {user ? <ChatStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthenticatedUserProvider>
  );
}
