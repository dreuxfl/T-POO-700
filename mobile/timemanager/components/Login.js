import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Login extends Component {
    state = {};

    constructor(props) {
        super(props)
    }

    static propTypes = {};

    componentDidMount() {
    }

    render() {
        return (
            <View>
                <Text>Hello LOGIN</Text>
            </View>
        )
    }
}

