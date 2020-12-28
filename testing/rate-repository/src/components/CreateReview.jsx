import { Formik } from 'formik';
import React from 'react';
import { Platform, Button, View, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import * as Yup from 'yup';
import { useHistory } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

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

export const CreateReview = () => {
    const initialValues = {
        owner: '',
        name: '',
        rating: '',
        review: '',
    };

    const history = useHistory();
    const [createReview] = useCreateReview();

    const handleCreateReview = async (values) => {
        const { owner, name, rating, review } = values;

        const data = await createReview({
            ownerName: owner,
            repositoryName: name,
            rating: +rating,
            text: review
        });

        if (data && data.createReview) {
            const repoId = data.createReview.repositoryId;
            history.push(`/${repoId}`);
        }

    };

    const CreateReviewForm = ({ handlePress }) => {
        return (
            <ScrollView style={styles.form}>
                <FormikTextInput
                    placeholder="Repository owner name"
                    name="owner"
                />
                <FormikTextInput
                    placeholder="Repository name"
                    name="name"
                />
                <FormikTextInput
                    placeholder="Rating between 0 and 100"
                    name="rating"
                />
                <FormikTextInput
                    placeholder="Review"
                    name="review"
                    multiline
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
        owner: Yup.string()
            .required("Repository owner name is required"),
        name: Yup.string()
            .required("Repository name is required"),
        rating: Yup.number()
            .typeError("Rating must be a number")
            .min(0)
            .max(100)
            .required("Rating is required"),
        review: Yup.string()
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={handleCreateReview}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <CreateReviewForm handlePress={handleSubmit} />}
            </Formik>
        </KeyboardAvoidingView>
    );
};

export default CreateReview;