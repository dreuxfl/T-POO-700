import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/Theme'



export default function Clockin() {

    const [isClockIn, setisClockin] = useState(false)

    return (
        <View style={styles.DisplayCenter}>
            <TouchableOpacity
                style={isClockIn ? styles.buttonclockin : styles.buttonclockout}
                onPress={() => setisClockin(!isClockIn)}
            >
                <Text>{isClockIn ? "Clock in" : "Clock out"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonclockin: {
        width: 300,
        height: 300,
        fontSize: 24,
        alignContent: "center",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 150,
        backgroundColor: theme.colors.positive
    },
    buttonclockout: {
        width: 300,
        height: 300,
        alignContent: "center",
        fontSize: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 150,
        backgroundColor: theme.colors.negative
    },
    DisplayCenter: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});
