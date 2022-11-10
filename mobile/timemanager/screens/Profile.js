import React, { useState } from 'react'
import {TouchableOpacity, StyleSheet, View, StatusBar} from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/Theme'
import { PasswordValidator } from '../helpers/PasswordValidator'
import Background from "../components/Background";
import Header from "../components/Header";
import Logo from "../components/Logo";
import { UsernameValidator } from '../helpers/UsernameValidator'
import { EmailValidator } from '../helpers/EmailValidator'
import Ionicons from "react-native-vector-icons/Ionicons";


export default function Profile() {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [titleText, setTitleText] = useState("");
    const [username, setUsername] = useState({ value: '', error: '' })
    const onEditpressed = () => {
        const passwordError = PasswordValidator(password.value)
        setPassword({ ...password, error: passwordError })
        if (passwordError) {
            setPassword({ ...password, error: passwordError })
            setTitleText({...titleText, value: "Error on password !"})
        }
        setTitleText({...titleText, value: "Password edited !"})
    
    }
    return (
        <Background>
            <Ionicons name="person-circle" size={100}/>
            <Header>Profile</Header>

            <TextInput
                label="Username"
                returnKeyType="next"
                value={UsernameValidator.value}
                onChangeText={(text) => setUsername({ value: text, error: '' })}
                error={!!username.error}
                errorText={username.error}
                autoCompleteType="username"
                textContentType="username"
                keyboardType="default"
            />
            <TextInput
                label="Email"
                returnKeyType="next"
                value={EmailValidator.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
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

            <Button style={styles.button} mode="contained" onPress={onEditpressed}>
                Edit
            </Button>
            <Text style= {styles.titletext}/>
        </Background>
    )
    }

    const styles = StyleSheet.create({
        titletext: {
            fontSize: 24,
            fontWeight: 'bold'
        },
        button: {
            backgroundColor: theme.colors.primary
        }
    })
