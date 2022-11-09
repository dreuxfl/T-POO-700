import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/Theme'
import { PasswordValidator } from '../helpers/PasswordValidator'
import Background from "../components/Background";
import Header from "../components/Header";
import Logo from "../components/Logo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UsernameValidator} from "../helpers/UsernameValidator";

export default function Login({ navigation }) {
    const [username, setUsername] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onLoginPressed = () => {
        const usernameError = UsernameValidator(username.value)
        const passwordError = PasswordValidator(password.value)
        if (usernameError || passwordError) {
            setUsername({ ...username, error: usernameError })
            setPassword({ ...password, error: passwordError })
            return
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
        })
    }

    return (
        <Background>
            <Logo />
            <Header>Login</Header>

                <TextInput
                    label= "Username"
                    returnKeyType="next"
                    value={username.value}
                    onChangeText={(text) => setUsername({ value: text, error: '' })}
                    error={!!username.error}
                    errorText={username.error}
                    autoCompleteType="username-new"
                    textContentType="username"
                    keyboardType="default"
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

            <Button style={styles.button} mode="contained" onPress={onLoginPressed}>
                Login
            </Button>
            <View style={styles.row}>
                <Text>Don’t have an account? </Text>

                <TouchableOpacity onPress={() => navigation.replace('Register')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    passwordContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    inputIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.secondary,
    },
    button:{
        backgroundColor: theme.colors.primary
    }
})
