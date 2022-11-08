import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Signup extends Component {
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
                <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Hello SIGNUP</Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            </View>
        )
    }
}

