import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class ClockIn extends Component {
    state = {};

    constructor(props) {
        super(props)
    }

    static propTypes = {};

    componentDidMount() {
    }

    render() {
        return (
            <View
                style={styles.style}>
                <Text>Hello</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    style: {},
});
