import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Ionicons from 'react-native-vector-icons/Ionicons';

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
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
                            iconName = focused ? 'ios-list' : 'ios-list-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Clock In" component={Login} />
                <Tab.Screen name="WorkingTime" component={Signup} />
                <Tab.Screen name="Profile" component={Signup} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}