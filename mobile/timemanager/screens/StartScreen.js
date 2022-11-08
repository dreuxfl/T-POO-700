import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import {StyleSheet} from "react-native";

export default function StartScreen({ navigation }) {
    return (
        <Background>
            <Logo />
            <Header>CLOCKORICO!</Header>
            <Paragraph>
                *Import a catch phrase (Maxence)*
            </Paragraph>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('Login')}
            >
                Login
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('Register')}
            >
                Sign Up
            </Button>
        </Background>
    );
}
