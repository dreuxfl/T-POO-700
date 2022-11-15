import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import {DataTable} from "react-native-paper";
import Header from '../components/Header'
import {StatusBar} from "react-native";
import ChartsManagerService from "../services/ChartsManagerService";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

export default function WorkingTime () {
    const [days, setDays] = useState(['mon','tue', 'wed', 'thu', 'fri'])
    const [start, setStart] = useState(['09:30', '08:00', '08:30', '09:00', '08:30'])
    const [end, setEnd] = useState(['16:30', '16:00', '17:30', '17:30', '17:30'])
    const [rows] = useState([])

    useEffect(() => {
      loadData().then(r => {})
    }, [])

    const loadData = async () => {
        const userId = parseInt(jwt_decode(await SecureStore.getItemAsync('access_token')).sub);
        ChartsManagerService.getLineChart(userId).then((response) => {
            if (response.data.data.length > 0) {
                console.log("Datas!!!");
            }
        });
    }

    for (let i = 0; i < days.length; i++){
        rows.push(
            <DataTable.Row key={i}>
                <DataTable.Cell>{days[i]}</DataTable.Cell>
                <DataTable.Cell numeric>{start[i]}</DataTable.Cell>
                <DataTable.Cell numeric>{end[i]}</DataTable.Cell>
            </DataTable.Row>
        )
    }
    return (
        <View style={styles.viewStyle}>
            <Header>Your weekly schedule</Header>
            <DataTable style={styles.tableStyle}>
                <DataTable.Header>
                    <DataTable.Title>Day</DataTable.Title>
                    <DataTable.Title numeric>Start</DataTable.Title>
                    <DataTable.Title numeric>End</DataTable.Title>
                </DataTable.Header>
                {rows}
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
    viewStyle: {
        flex: 1,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight
    },
    tableStyle: {
        width: "96%",
    },
});
