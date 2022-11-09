import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import RNSVGRect from "react-native-svg";
import {theme} from "../core/Theme";
import {DataTable} from "react-native-paper";
import Header from '../components/Header'


export default function WorkingTime () {
    const days = ['mon','tue', 'wed', 'thu', 'fri'];
    const start = ['09:30', '08:00', '08:30', '09:00', '08:30'];
    const end = ['16:30', '16:00', '17:30', '17:30', '17:30'];

        return (
            <View style={styles.viewStyle}>
                <Header>Your weekly schedule</Header>
                <DataTable style={styles.tableStyle}>
                    <DataTable.Header>
                        <DataTable.Title>Day</DataTable.Title>
                        <DataTable.Title numeric>Start</DataTable.Title>
                        <DataTable.Title numeric>End</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>Monday</DataTable.Cell>
                        <DataTable.Cell numeric>09:50</DataTable.Cell>
                        <DataTable.Cell numeric>17:00</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Tuesday</DataTable.Cell>
                        <DataTable.Cell numeric>09:30</DataTable.Cell>
                        <DataTable.Cell numeric>16:30</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Wednesday</DataTable.Cell>
                        <DataTable.Cell numeric>08:30</DataTable.Cell>
                        <DataTable.Cell numeric>16:30</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Thursday</DataTable.Cell>
                        <DataTable.Cell numeric>09:30</DataTable.Cell>
                        <DataTable.Cell numeric>16:30</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Friday</DataTable.Cell>
                        <DataTable.Cell numeric>09:00</DataTable.Cell>
                        <DataTable.Cell numeric>16:30</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
                <Header>Your weekly chart</Header>
                <LineChart
                    bezier
                    data={{
                        labels: ['jan', 'feb', 'mar', 'apr', 'may', ' jun'],
                        datasets: [
                            {
                                data: [1, 7, 6, 4, 2, 5],
                                strokeWidth: 2,
                                color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
                            },
                            {
                                data: [2, 4, 6, 8, 8, 2],
                                strokeWidth: 2,
                                color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
                            },

                        ],
                        legend: ['Working Hours', 'Clocked Hours'],
                    }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#FBEADE',
                        useShadowColorFromDataset: true,
                        backgroundGradientFrom: '#F7C9A9',
                        backgroundGradientTo: '#FDE9DA',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </View>
        )

}

const styles = StyleSheet.create({
    viewStyle: {flex: 1,
        alignItems: 'center',
        },
    tableStyle: {
        width: "96%",
    },
});
