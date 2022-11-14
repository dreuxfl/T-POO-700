import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { StyleSheet, View, Text} from "react-native";

export default function StartScreen({ navigation }) {
    var SampleNameArray =
        [
            "It's finger clockin' good",
            "Clock me like one of your french girls",
            "Los clockos hermanos",
            "La ferme aux clockodiles",
            "I'm clockin'it",
            "Clock it like its hot",
            "Hit me with your best clock",
            "Parce-que nous le clockons bien",
            "Just clock it",
            "Des clocks oui, mais des clockoricos",
            "Yves Clocké – Se clocker chaque jour",
            "Clock comme si tu devais démissionner demain, travaille comme si tu devais clocker toujours",
            "Suck my clock",
            "C'est fort en clockolat",
            "C’est moche, mais ça clock",
            "Clocking people",
            "Clockorico en avant les clockin'"
        ];
    const [random] = useState(SampleNameArray[Math.floor(Math.random()*SampleNameArray.length)])

    return (
        <Background>
            <Logo />
            <Header>CLOCKORICO!</Header>
            <Paragraph>
                <Text>{random}</Text>
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
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        margin: 10

    },
    TextStyle: {
        fontSize: 25,
        textAlign: 'center'
    }

});