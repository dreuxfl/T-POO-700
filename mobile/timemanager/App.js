import {useEffect, useState} from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-native-paper'

import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import StartScreen from "./screens/StartScreen";
import Signup from "./screens/Signup";

import {theme} from "./core/Theme";
import * as SecureStore from "expo-secure-store";

const Stack = createStackNavigator()

export default function App() {
    const [token, setToken] = useState(null)
    useEffect(()=>{
        // const fetchToken = async() => {
        //     return(await SecureStore.getItemAsync('access_token'))
        // }

        // fetchToken().then(token => {
        //     if(token) setToken(token)
        //     else 
            setToken(false)
        // });
    },[]);

    useEffect(()=>{console.log(token)},[token])
    return (
        <Provider theme={theme}>
            {token !== null && <NavigationContainer>

                <Stack.Navigator
                    initialRouteName={token ? "Dashboard" : "StartScreen"}
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="StartScreen" component={StartScreen} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Signup} />
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                </Stack.Navigator>
            </NavigationContainer>}
        </Provider>
    )
}