import React, { useState } from 'react'
import {StyleSheet, TouchableOpacity, View, Alert} from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/Theme'
import {StatusBar} from "react-native";
import { Stopwatch } from 'react-native-stopwatch-timer'
import Header from "../components/Header";


export default function Clockin() {

    const [lastClock, setLastClock] = useState(new Date());

    const [isClockIn, setIsClockIn] = useState(false) //Am i clocked in currently?
    const [timerDuration, setTimerDuration] = useState(0)

    const clock = () => {
        if(isClockIn) {     //Clocking out
            let lastClockOut = new Date()
            setIsClockIn(false)
            let clockDuration = new Date('2000-10-12T' + timerDuration)
            Alert.alert(
                "Confirm clock out",
                `Are you sure you want to clock out ?\nClock duration is ${clockDuration.getUTCHours()} hours, ${clockDuration.getUTCMinutes()} minutes, ${clockDuration.getUTCSeconds()} seconds`,
                [
                    {
                        text: "Cancel", style: "cancel", onPress: () => {
                            setIsClockIn(true)
                        },
                    },
                    { 
                        text: "OK", onPress: () => {
                            setLastClock(lastClockOut)
                        } 
                    }
                ]
            );
        } else {            //Clocking in
            setIsClockIn(!isClockIn);
            setLastClock(new Date())
        }
        
    }
    return (

        <View style={styles.displayCenter}>
            <Header>
                Clock manager
            </Header>
            <TouchableOpacity
                style={isClockIn ? styles.buttonclockout : styles.buttonclockin} 
                onPress={clock}
            >
                <Text> {
                    isClockIn ? "Clock out" : "Clock in" /*Currently clocked in -> show "Clock out"*/ 
                } </Text> 
            </TouchableOpacity>
            <Text style={styles.title}>
                Last Clock In : {lastClock.toLocaleTimeString()}
            </Text>
            <Stopwatch

                start={isClockIn}
                options={options}
                getTime={(time) => {
                    setTimerDuration(time);
                }}
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

    displayCenter: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop:StatusBar.currentHeight
    },
    cancel: {
        color: theme.colors.negative
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
        color:  theme.colors.text,
        marginLeft: 7,
    },
};
