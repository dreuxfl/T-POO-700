import React, { useState } from 'react'
import {SafeAreaView, StyleSheet, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/Theme'
import {StatusBar} from "react-native";
import { Stopwatch } from 'react-native-stopwatch-timer'
import Header from "../components/Header";


export default function Clockin() {

    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);

    const [lastClockIn, setLastClockIn] = useState(new Date().toTimeString());

    const [isClockIn, setisClockin] = useState(false)

    return (

        <View style={styles.DisplayCenter}>
            <Header>
                Clock in
            </Header>
            <Text style={styles.title}>

                {lastClockIn}
            </Text>

            <TouchableOpacity
                style={isClockIn ? styles.buttonclockin : styles.buttonclockout}
                onPress={() =>
                    {setIsStopwatchStart(!isClockIn); setResetStopwatch(false);
                    setisClockin(!isClockIn);
                    setLastClockIn(new Date().toTimeString())}}
            >
                <Text>{isClockIn ? "Clock in" : "Clock out"}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>
                Last Clock In
            </Text>
            <Stopwatch
                laps
                start={!isClockIn}
                reset={false}
                options={options}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonclockin: {
        width: 200,
        height: 200,
        fontSize: 24,
        alignContent: "center",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: theme.colors.positive
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    buttonclockout: {
        width: 200,
        height: 200,
        alignContent: "center",
        fontSize: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: theme.colors.negative
    },

    DisplayCenter: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop:StatusBar.currentHeight
    }
});
const options = {
    container: {
        backgroundColor: theme.colors.secondary,
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        marginLeft: 7,
    },
};
