import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Ionicons from "react-native-vector-icons/Ionicons";
import {theme} from "../core/Theme";
import Login from "./Login";
import Signup from "./Signup";
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function Dashboard({ navigation }) {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        switch (route.name){
                            case 'Clock In':
                                iconName = focused
                                    ? 'ios-time'
                                    : 'ios-time-outline';
                                break;
                            case 'WorkingTime':
                                iconName = focused ? 'ios-list' : 'ios-list-outline';
                                break;
                            case 'Profile':
                                iconName = focused ? 'person-circle' : 'person-circle-outline';
                                break;

                        }

                        if (route.name === 'Login') {

                        } else if (route.name === 'Register') {
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Clock In" component={Login} />
                <Tab.Screen name="WorkingTime" component={Signup} />
                <Tab.Screen name="Profile" component={Signup} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
