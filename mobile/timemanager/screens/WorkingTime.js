import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { DataTable } from "react-native-paper";
import Header from '../components/Header'
import { StatusBar } from "react-native";
import ChartsManagerService from "../services/ChartsManagerService";
import moment from "moment";



export default function WorkingTime() {

    const [days, setDays] = useState(['mon', 'tue', 'wed', 'thu', 'fri'])
    const [start, setStart] = useState(['09:30', '08:00', '08:30', '09:00', '08:30'])
    const [end, setEnd] = useState(['16:30', '16:00', '17:30', '17:30', '17:30'])

    const [labels, setLabels] = useState([])
    const [hoursWorked, setHoursWorked] = useState([])
    const [hoursClocked, setHoursClocked] = useState([])
    const [rows, setRows] = useState([])

    const loadData= () =>{
        ChartsManagerService.getLineChart().then((response) => {
            if (response.data.data.length > 0) {
                for (let i = 0; i < response.data.data.length; i++) {
                    console.log(response.data)
                }
            }
        });

    }


    for (let i = 0; i < days.length; i++) {
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
                    labels: days,
                    datasets: [
                        {
                            data: start,
                            strokeWidth: 2,
                            color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
                        },
                        {
                            data: end,
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
