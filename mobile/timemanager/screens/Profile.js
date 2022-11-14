import React, { useState } from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import TextInput from '../components/TextInput';
import { theme } from '../core/Theme';
import Background from "../components/Background";
import Header from "../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from '../components/Button'
import UserService from "../services/UserService";
import { PasswordValidator } from '../helpers/PasswordValidator';
import { UsernameValidator } from '../helpers/UsernameValidator';
import { EmailValidator } from '../helpers/EmailValidator';

export default function Profile() {
    const [username, setUsername] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [oldPassword, setOldPassword] = useState({ value: '', error: '' })
    const [truePassword, setTruePassword] = useState({ value: '', error: '' })
    const [inFunction, setInFunction] = useState(false);

    UserService.getProfile().then(response => {
        setUsername({ value: response.data.username, error: '' });
        setEmail({ value: response.data.email, error: '' });
        setPassword({ value: response.data.password, error: '' });
    }).catch(error => {
        console.log(error);
    })

    const onEditpressed = () => {
        if (inFunction) {
            const usernameError = UsernameValidator(username.value);
            const emailError = EmailValidator(email.value);
            const passwordError = PasswordValidator(password.value);
            const oldPasswordError = PasswordValidator(oldPassword.value)
            const truePasswordError = PasswordValidator(truePassword.value)

            setPassword({...password, error: passwordError});
            setOldPassword({...password, error: oldPasswordError})
            setTruePassword({...password, error: truePasswordError})
            setUsername({...username, error: usernameError});
            setEmail({...email, error: emailError});

            if (usernameError || emailError || passwordError || oldPasswordError || truePasswordError) {
                setUsername({...username, error: usernameError});
                setEmail({...email, error: emailError});
                setPassword({...password, error: passwordError});
                setOldPassword({...oldPassword, error: oldPasswordError})
                setTruePassword({...truePassword, error: truePasswordError})
            } else
                // UserService.putUser().then(response => {
                //     try {
                //         console.log(response);
                //     } catch (e) {
                //         console.log(e);
                //     }
                // })
                setInFunction(false);
        } else
            setInFunction(true);
    }
    return (
        <Background>
            <Ionicons name="person-circle" size={100} />
            <Header>Connected as {username.value}</Header>

            <TextInput
                label="Username"
                returnKeyType="next"
                value={username.value}
                onChangeText={(text) => setUsername({ value: text, error: '' })}
                error={!!username.error}
                errorText={username.error}
                autoCompleteType="username"
                textContentType="username"
                keyboardType="default"
                editable={inFunction}
            />

            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                editable={inFunction}
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
                editable={inFunction}
            />

            {inFunction &&
                <>
                    <TextInput
                        label="Old Password"
                        returnKeyType="done"
                        value={oldPassword.value}
                        onChangeText={(text) => setOldPassword({ value: text, error: '' })}
                        error={!!oldPassword.error}
                        errorText={oldPassword.error}
                        secureTextEntry
                    />

                    <TextInput
                        label="Confirm Password"
                        returnKeyType="done"
                        value={truePassword.value}
                        onChangeText={(text) => setTruePassword({ value: text, error: '' })}
                        error={!!truePassword.error}
                        errorText={truePassword.error}
                        secureTextEntry
                    />
                </>
            }

            <Button style={styles.button} mode="contained" onPress={onEditpressed}>
                {inFunction ? "Save" : "Edit"}
            </Button>
        </Background>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        width: 200,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary
    }
})
