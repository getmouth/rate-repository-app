import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { Platform, Button, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import * as Yup from 'yup';
import { useHistory } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useStateValue } from '../state';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 29,
        backgroundColor: theme.colors.white
    },
    button: {
        marginTop: 20,
        color: 'red'
    }
});

export const SignInFormContainer = ({ onSubmit }) => {
    const initialValues = {
        username: '',
        password: ''
    };

    const handleSubmitting = (values) => {
        onSubmit(values);
    };

    const SignInForm = ({ handlePress }) => {
        return (
            <View >
                <FormikTextInput
                    placeholder="Username"
                    name="username"
                />
                <FormikTextInput
                    placeholder="Password"
                    name="password"
                    secureTextEntry
                />
                <View style={styles.button}>
                    <Button
                        title="Sign In"
                        onPress={handlePress}
                        testID="submitBtn"
                    />
                </View>
            </View>
        );
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username required"),
        password: Yup.string()
            .required("Password required"),
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitting}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <SignInForm handlePress={handleSubmit} />}
            </Formik>
        </KeyboardAvoidingView>
    );
};

const SignIn = () => {
    const [signIn] = useSignIn();
    const [{ token }] = useStateValue();
    const history = useHistory();

    useEffect(() => {
        if (token) {
            history.push('/');
        }

    }, [token]);

    const onSubmit = async (values) => {

        const { username, password } = values;
        try {
            await signIn({ username, password });

        } catch (err) {
            console.log('CATCH ERROR', err.message);
        }
    };

    return <SignInFormContainer onSubmit={onSubmit} />;

};

export default SignIn;