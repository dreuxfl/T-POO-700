import React, {useEffect, useState} from 'react';
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
    const [userId, setUserId] = useState({value: '', error: ''});
    const [username, setUsername] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
    const [inFunction, setInFunction] = useState(false);

    useEffect(() => {
        UserService.getProfile().then((response) => {
            setUserId({value: response.data.data.id, error: ''});
            setUsername({value: response.data.data.username, error: ''});
            setEmail({value: response.data.data.email, error: ''});
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const openEditor = () => {
        setInFunction(true);

        if (inFunction) {
            const usernameError = UsernameValidator(username.value);
            const emailError = EmailValidator(email.value);
            const passwordError = PasswordValidator(password.value);
            const confirmPasswordError = PasswordValidator(confirmPassword.value);

            if (usernameError || emailError || passwordError || confirmPasswordError) {
                setUsername({ ...username, error: usernameError });
                setEmail({ ...email, error: emailError });
                setPassword({ ...password, error: passwordError });
                setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
                return;
            }

            if (password.value !== confirmPassword.value) {
                setPassword({ ...password, error: 'Passwords do not match' });
                setConfirmPassword({ ...confirmPassword, error: 'Passwords do not match' });
                return;
            }
            UserService.putUser(userId.value, email.value, username.value, password.value).then(() => {
                setInFunction(false);
                ToastAndroid.showWithGravityAndOffset(
                    "User updated",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }).catch(error => {
                setInFunction(false);
                console.log(error);
            })
        }
    }

    const cancelEditor = () => {
        setInFunction(false);
        setUsername({...username, error: ''});
        setEmail({...email, error: ''});
        setPassword({...password, error: ''});
        setConfirmPassword({...confirmPassword, error: ''});
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

            {inFunction &&
                <>
                    <TextInput
                        label="Password"
                        returnKeyType="done"
                        value={password.value}
                        onChangeText={(text) => setPassword({ value: text, error: '' })}
                        error={!!password.error}
                        errorText={password.error}
                        secureTextEntry
                    />

                    <TextInput
                        label="Confirm Password"
                        returnKeyType="done"
                        value={confirmPassword.value}
                        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                        error={!!confirmPassword.error}
                        errorText={confirmPassword.error}
                        secureTextEntry
                    />
                </>
            }

            <Button style={styles.button} mode="contained" onPress={openEditor}>
                {inFunction ? "Save" : "Edit"}
            </Button>

            {inFunction &&
                <Button style={styles.button} mode="contained" onPress={cancelEditor}>
                    Cancel
                </Button>
            }
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
