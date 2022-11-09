import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import {theme} from "../core/Theme";
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClockIn from "./ClockIn";
import WorkingTime from "./WorkingTime";
import Profile from "./Profile";


const Tab = createBottomTabNavigator();

export default function Dashboard() {

    return (
        <NavigationContainer independent={true}>
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

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Clock In" component={ClockIn} />
                <Tab.Screen name="WorkingTime" component={WorkingTime} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
