import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import TextInput from '../components/TextInput';
import { theme } from '../core/Theme';
import { PasswordValidator } from '../helpers/PasswordValidator';
import Background from "../components/Background";
import Header from "../components/Header";
import { UsernameValidator } from '../helpers/UsernameValidator';
import { EmailValidator } from '../helpers/EmailValidator';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Profile() {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [oldPassword, setOldPassword] = useState({ value: '', error: '' })
    const [truePassword, setTruePassword] = useState({ value: '', error: '' })
    const [username, setUsername] = useState({ value: '', error: '' });
    const [inFunction, setInFunction] = useState(false);

    const onEditpressed = () => {
        if (inFunction) {
            const passwordError = PasswordValidator(password.value);
            const oldPasswordError = PasswordValidator(oldPassword.value)
            const truePasswordError = PasswordValidator(truePassword.value)
            const usernameError = UsernameValidator(username.value);
            const emailError = EmailValidator(email.value);
            setPassword({...password, error: passwordError});
            setOldPassword({...password, error: oldPasswordError})
            setTruePassword({...password, error: truePasswordError})
            setUsername({...username, error: usernameError});
            setEmail({...email, error: emailError});
            if (passwordError || usernameError || emailError) {
                setPassword({...password, error: passwordError});
                setOldPassword({...oldPassword, error: oldPasswordError})
                setTruePassword({...truePassword, error: truePasswordError})
                setUsername({...username, error: usernameError});
                setEmail({...email, error: emailError});
            } else
                setInFunction(false);
        } else
            setInFunction(true);
    }
    return (
        <Background>
            <Ionicons name="person-circle" size={100} />
            <Header>Connected as ...</Header>

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
                editable={inFunction}
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
                editable={inFunction}
            />

            {inFunction && <TextInput
                label="Old Password"
                returnKeyType="done"
                value={oldPassword.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!oldPassword.error}
                errorText={oldPassword.error}
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
                editable={inFunction}
            />

            {inFunction && <TextInput
                label="Confirm Password"
                returnKeyType="done"
                value={truePassword.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!truePassword.error}
                errorText={truePassword.error}
                secureTextEntry
            />}

            <TouchableOpacity style={styles.button} mode="contained" onPress={onEditpressed}>
                <Text>{inFunction? "Save your profile" : "Edit your profile"}</Text>
            </TouchableOpacity>
        </Background>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary
    }
})
