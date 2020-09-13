import { Formik } from 'formik';
import React from 'react';
import { Platform, Button, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import * as Yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

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

const SignIn = () => {
    const initialValues = {
        username: '',
        password: ''
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, "Must be at least 3 characters")
            .required("Username required"),
        password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .required("Password required"),
    });

    const onSubmit = (values) => {
        console.log('Pressed', values);
    };

    const SignInForm = ({ onSubmit }) => {
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
                        onPress={onSubmit}
                    />
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
            </Formik>
        </KeyboardAvoidingView>
    );
};

export default SignIn;