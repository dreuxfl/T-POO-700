import React, { useEffect, useState } from 'react'
import * as SecureStore from "expo-secure-store";
import {StyleSheet, TouchableOpacity, View, Alert, ToastAndroid} from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/Theme'
import {StatusBar} from "react-native";
import { Stopwatch } from 'react-native-stopwatch-timer'
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
import ClockService from "../services/ClockService";
import moment from "moment";

export default function Clockin() {

    const [lastClock, setLastClock] = useState(null);
    const [isClockIn, setIsClockIn] = useState(false); //Am i currently clocked in ?
    const [clockOffset, setClockOffset] = useState(null);

    let timerDuration = 0;

    const customDateParser = (dateTimeString) => {
        let dateArray = dateTimeString.split('T')[0].split('-');
        let timeArray = dateTimeString.split('T')[1].split(':');
        return new Date(
            parseInt(dateArray[0]),
            parseInt(dateArray[1]-1), //months are 0 indexed (fuck js)
            parseInt(dateArray[2]),
            parseInt(timeArray[0]),
            parseInt(timeArray[1]),
            Math.trunc(parseFloat(timeArray[2])))
    }
    useEffect(()=>{
        const getClocks = async() => ClockService.getCurrentClocks(await getUserId()).then(response=>{
            let totalClockDuration = 0;
            let lastClock = null;
            setIsClockIn (false);
            let clocks = response.data.data
            if(clocks.length > 0){
              if(!clocks[0].status) clocks.shift(); //If the day starts with a clockout, ignore
    
              clocks.forEach(clock => {
                if(clock.status) totalClockDuration -= customDateParser(clock.time).getTime();
                else totalClockDuration += customDateParser(clock.time).getTime();
              });
    
              lastClock= clocks[clocks.length-1];

            }
            if(lastClock){
              if(lastClock.status) totalClockDuration += (new Date().getTime());
                
              setIsClockIn(lastClock.status); //Current status is the the same as the last one sent (if the last thing you sent is "i'm clocking out", then you should currently be clocked ou -> show green button, 'clock in')
              setLastClock(customDateParser(lastClock.time));
            }

            setClockOffset(totalClockDuration);
        })

        getClocks();
    },[])

    const getUserId = async() => { return parseInt(jwt_decode( await SecureStore.getItemAsync('access_token')).sub)}

    const saveClock = async(clockStatus, clockDateTime) => {
        ClockService.postClock(   
            await getUserId(),
            clockStatus, 
            moment(clockDateTime).format("YYYY-MM-DD HH:mm:ss")
        ).then(() => {
            ToastAndroid.showWithGravityAndOffset(
                `Successfully clocked ${isClockIn? 'in' : 'out'}`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            setIsClockIn(clockStatus);
            setLastClock(clockDateTime);
        }).catch(error => {
            console.log(error);
        })
    }
    const clock = async () => {
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
                        text: "OK", onPress: async() => {
                            saveClock(false, lastClockOut)
                        } 
                    }
                ]
            );
        } else {            //Clocking in
            saveClock(true, new Date())
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
                <Text style={{fontSize:30}}> {
                    isClockIn ? "Clock out" : "Clock in" /*Currently clocked in -> show "Clock out"*/ 
                } </Text> 
            </TouchableOpacity>
            <Text style={styles.title}>
                {lastClock === null 
                ? "Never clocked in today" 
                : `Last Clock ${isClockIn ? "in" : "out"} : ${lastClock.toLocaleTimeString()}`}
            </Text>
            {clockOffset !== null && <Stopwatch
                startTime={clockOffset}
                start={isClockIn}
                options={options}
                getTime={(time) => {
                    timerDuration = time;
                }}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    buttonclockin: {
        width: 200,
        height: 200,
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
