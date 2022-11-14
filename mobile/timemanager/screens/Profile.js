import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, StatusBar } from 'react-native'
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
    const [oldpassword, setOldPassword] = useState({ value: '', error: '' })
    const [truepassword, setTruePassword] = useState({ value: '', error: '' })
    const [titleText, setTitleText] = useState("");
    const [username, setUsername] = useState({ value: '', error: '' })
    const [infunction, setInfunction] = useState(false)
    const onEditpressed = () => {
        if (infunction) {
            const passwordError = PasswordValidator(password.value)
            const oldpasswordError = PasswordValidator(oldpassword.value)
            const truepasswordError = PasswordValidator(truepassword.value)
            const usernameError = UsernameValidator(username.value)
            const emailError = EmailValidator(email.value)
            setPassword({ ...password, error: passwordError })
            setOldPassword({ ...password, error: oldpasswordError })
            setTruePassword({ ...password, error: truepasswordError })
            setUsername({ ...username, error: usernameError })
            setEmail({ ...email, error: emailError })
            if (passwordError || usernameError || emailError) {
                setPassword({ ...password, error: passwordError })
                setOldPassword({ ...oldpassword, error: oldpasswordError })
                setTruePassword({ ...truepassword, error: truepasswordError })
                setUsername({ ...username, error: usernameError })
                setEmail({ ...email, error: emailError })
                setTitleText({ ...titleText, value: "Error check your data" })

            }
            else setInfunction(false);
            setTitleText({ ...titleText, value: "Edited !" })

        } else
            setInfunction(true);
    }
    return (
        <Background>
            <Ionicons name="person-circle" size={100} />
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
                editable={infunction}
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
                editable={infunction}
            />
            {infunction &&<TextInput 
                label="Old Password"
                returnKeyType="done"
                value={oldpassword.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!oldpassword.error}
                errorText={oldpassword.error}
                secureTextEntry
            />}
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
                editable={infunction}
            />
            {infunction && <TextInput 
                label="Confirm Password"
                returnKeyType="done"
                value={truepassword.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!truepassword.error}
                errorText={truepassword.error}
                secureTextEntry
            />}

            <TouchableOpacity style={styles.button} mode="contained" onPress={onEditpressed}>
                <Text>{infunction ? "Save" : "Edit"}</Text>
            </TouchableOpacity>

            <Text style={styles.titletext} {...titleText} />
        </Background>
    )
}

const styles = StyleSheet.create({
    titletext: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {

        width: 200,

        height: 50,

        fontSize: 18,

        borderRadius: 5,

        alignContent: "center",

        justifyContent: 'center',

        alignItems: 'center',

        backgroundColor: theme.colors.primary

    }
})
