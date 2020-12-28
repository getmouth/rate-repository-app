import { Formik } from 'formik';
import React from 'react';
import {
    Platform,
    Button,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Alert
} from 'react-native';
import * as Yup from 'yup';
import { useHistory } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 29,
        backgroundColor: theme.colors.white,
        justifyContent: "space-around",
    },
    button: {
        marginTop: 20,
        color: 'red'
    },
    form: {
        flex: 1,
        paddingHorizontal: 20,

    }
});

export const SignUp = () => {
    const initialValues = {
        username: '',
        password: '',
        passwordConfirm: '',
    };

    const history = useHistory();
    const [signUp] = useSignUp();

    const handleSignup = async (values) => {
        const { username, password } = values;

        const data = await signUp({ username, password });

        if (data && data.createUser) {
            const user = data.createUser.username;
            Alert.alert(`user ${user} has been succesfully created`);
            history.push(`/signin`);
        }

    };

    const SignupForm = ({ handlePress }) => {
        return (
            <ScrollView style={styles.form}>
                <FormikTextInput
                    placeholder="Username"
                    name="username"
                />
                <FormikTextInput
                    placeholder="Password"
                    name="password"
                    secureTextEntry
                />
                <FormikTextInput
                    placeholder="Password confirmation"
                    name="passwordConfirm"
                    secureTextEntry
                />
                <View style={styles.button}>
                    <Button
                        title="Create a review"
                        onPress={handlePress}
                        testID="submitBtn"
                    />
                </View>
            </ScrollView>
        );
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(1)
            .max(30)
            .required("Username is required"),
        password: Yup.string()
            .min(5)
            .max(50)
            .required("Password is required"),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password does not match')
            .required("Password confirmation is required"),
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={handleSignup}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <SignupForm handlePress={handleSubmit} />}
            </Formik>
        </KeyboardAvoidingView>
    );
};

export default SignUp;