import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useHistory } from 'react-router-native';
import { format } from 'date-fns';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingBottom: 15
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        padding: 20
    },
    count: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        borderColor: theme.colors.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rating: {
        color: theme.colors.primary,
    },
    text: {
        paddingLeft: 15,
        marginRight: 15
    },
    user: {
        fontWeight: "bold",
        fontSize: 16
    },
    userDate: {
        marginBottom: 5
    },
    review: {
        paddingRight: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: '45%',
    }
});

const ReviewItem = ({ review, fromReviews, confirm }) => {
    const { push } = useHistory();

    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.count}>
                        <Text style={styles.rating}>
                            {review.rating}
                        </Text>
                    </View>
                    <View style={styles.text}>
                        <View style={styles.userDate}>
                            <Text style={styles.user}>{fromReviews ? review.repository.fullName : review.user.username}</Text>
                            <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                        </View>
                        <Text style={styles.review}>{review.text}</Text>
                    </View>
                </View>
                {fromReviews ? (
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title="View repository"
                                onPress={() => push(`/${review.repository.id}`)}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button title="Delete review" color="#e63946" onPress={() => confirm(review.id)} />
                        </View>
                    </View>
                ) : null}
            </View>
        </>
    );
};

export default ReviewItem;