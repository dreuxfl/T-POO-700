import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { DataTable } from "react-native-paper";
import Header from '../components/Header'
import { StatusBar } from "react-native";
import ChartsManagerService from "../services/ChartsManagerService";
import moment from "moment";
import WorkingTimesService from "../services/WorkingTimesService";

export default function WorkingTime() {
    const [days, setDays] = useState([]);
    const [start, setStart] = useState([]);
    const [end, setEnd] = useState([]);
    const [label, setLabel] = useState([]);
    const [hoursWorked, setHoursWorked] = useState([]);
    const [hoursClocked, setHoursClocked] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const dummy_labels = [];
        const dummy_clocks = [];
        const dummy_workingTimes = [];

        ChartsManagerService.getLineChart().then((response) => {
            if (response.data.data.length > 0) {
                for (let i = 0; i < response.data.data.length; i++) {
                    dummy_labels.push(moment(response.data.data[i].day).format("ddd"));
                    dummy_workingTimes.push(response.data.data[i].workingtime);
                    dummy_clocks.push(response.data.data[i].hoursclocked);
                }
                setLabel(dummy_labels);
                setHoursWorked(dummy_workingTimes);
                setHoursClocked(dummy_clocks);
                console.log(hoursClocked);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        const dummy_days = [];
        const dummy_start = [];
        const dummy_end = [];

        WorkingTimesService.getWorkingTimesByUser().then((response) =>{
            if (response.data.data && response.data.data.length > 0) {
                for (let i = 0; i < response.data.data.length; i++) {
                    dummy_days.push(moment(response.data.data[i].start).format('ddd'));
                    dummy_start.push(moment(response.data.data[i].start).format('HH:mm'));
                    dummy_end.push(moment(response.data.data[i].end).format('HH:mm'));
                }
                setDays(dummy_days);
                setStart(dummy_start);
                setEnd(dummy_end);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if (days.length > 0 && start.length > 0 && end.length > 0) {
            const dummy_rows = [];
            for (let i = 0; i < days.length; i++) {
                dummy_rows.push(
                    <DataTable.Row key={i}>
                        <DataTable.Cell>{days[i]}</DataTable.Cell>
                        <DataTable.Cell numeric>{start[i]}</DataTable.Cell>
                        <DataTable.Cell numeric>{end[i]}</DataTable.Cell>
                    </DataTable.Row>
                );
            }
            setRows(dummy_rows);
        }
    }, [days, start, end]);

    return (
        <View style={styles.viewStyle}>
            <Header>Your weekly schedule</Header>
            <DataTable style={styles.tableStyle}>
                <DataTable.Header>
                    <DataTable.Title>Day</DataTable.Title>
                    <DataTable.Title numeric>Start</DataTable.Title>
                    <DataTable.Title numeric>End</DataTable.Title>
                </DataTable.Header>
                {rows.length > 0 && rows}
            </DataTable>
            <Header>Your weekly chart</Header>
            {
                hoursWorked.length > 1 && hoursClocked.length > 1 &&
                <LineChart
                    bezier
                    data={{
                        labels: label,
                        datasets: [
                            {
                                data: hoursWorked,
                                strokeWidth: 2,
                                color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
                            },
                            {
                                data: hoursClocked,
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
            }
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
