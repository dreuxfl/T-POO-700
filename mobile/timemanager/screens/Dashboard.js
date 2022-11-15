import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import {theme} from "../core/Theme";
import {NavigationContainer} from "@react-navigation/native";
import ClockIn from "./ClockIn";
import WorkingTime from "./WorkingTime";
import Profile from "./Profile";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function Dashboard() {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                tabBarPosition= 'bottom'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color}) => {
                        let iconName;
                        switch (route.name){
                            case 'Clock In':
                                iconName = focused ? 'ios-time' : 'ios-time-outline';
                                break;
                            case 'WorkingTime':
                                iconName = focused ? 'ios-list' : 'ios-list-outline';
                                break;
                            case 'Profile':
                                iconName = focused ? 'person-circle' : 'person-circle-outline';
                                break;
                        }
                        return <Ionicons name={iconName} size={24} color={color} />;
                    },
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: 'gray',
                    tabBarShowLabel: false,
                    tabBarShowIcon: true,
                    tabBarBounces: true

                })}
            >
                <Tab.Screen name="Clock In" component={ClockIn} />
                <Tab.Screen name="WorkingTime" component={WorkingTime} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
