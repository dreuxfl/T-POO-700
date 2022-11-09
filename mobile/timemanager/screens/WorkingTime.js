import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import RNSVGRect from "react-native-svg";
import {theme} from "../core/Theme";


const linedata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {

            data: [20, 45, 28, 80, 99, 43],
            label:"Working Hours",
            strokeWidth: 2, // optional
        },
        {

            data: [10, 35, 88, 21, 72, 24],
            label: "Clocks",
            strokeWidth: 2, // optional
        },
    ],
};

export default class WorkingTime extends Component {
    state = {};


    render() {
        return (
            <View>
                <LineChart
                    data={linedata}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    yAxisLabel={'h'}

                    chartConfig={{
                        backgroundColor: '#FBEADE',
                        useShadowColorFromDataset: true,
                        backgroundGradientFrom: '#be7744',
                        backgroundGradientTo: '#F7C9A9',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    style: {},
});
