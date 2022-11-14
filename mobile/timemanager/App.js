import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-native-paper'

import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import StartScreen from "./screens/StartScreen";
import Signup from "./screens/Signup";

import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from "./core/Theme";

const Stack = createStackNavigator()

export default function App() {
    return (
    <Provider theme={theme}>
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="StartScreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Signup} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
    )
}