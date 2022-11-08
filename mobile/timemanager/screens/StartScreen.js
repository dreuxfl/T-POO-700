import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { StyleSheet} from "react-native";

export default function StartScreen({ navigation }) {
    const [random, setRandom] = useState(SampleNameArray[Math.random(SampleNameArray.length)])

    var SampleNameArray = ["it's finger clockin' good", "Clock me like one of your french girls", "Los clockos hermanos", "La ferme aux clockodiles", "I'm clockin'it", "Clock it like its hot", "Hit me with your best clock", "Parce que nous le clockons bien", "Just clock it", "Des clocks oui, mais des clockorico", "Yves Clocké– Se clocker chaque jour..", "Clock comme si tu devais démissionner demain.", "Suck my clock", "Travail comme si tu devais clocker toujours", "C'est fort en clockocolat", "C’est moche, mais ça marche.", "Clocking people", "Clockorico en avant les clocks in"];
    return (
        <Background>
            <Logo />
            <Header>CLOCKORICO!</Header>
            <View style={styles.MainContainer}>
                <Text>{random}</Text>
            </View>
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