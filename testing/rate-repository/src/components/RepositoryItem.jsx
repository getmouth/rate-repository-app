import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import * as Linking from 'expo-linking';
import RepoFooterItem from './RepoFooterItem';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        padding: 20,
        fontFamily: theme.fonts.main
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    name: {
        marginTop: 10,
        marginBottom: 10
    },
    description: {
        marginBottom: 10,
        fontSize: theme.fontSizes.body

    },
    repoContent: {
        flexDirection: 'row',
    },
    repoInfo: {
        marginLeft: 30,
        flexShrink: 1
    },
    language: {
        backgroundColor: theme.colors.primary,
        width: 100,
        borderRadius: 5,
        color: theme.colors.white,
        padding: 7,
        marginBottom: 15,
        textAlign: 'center'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 50
    },
    button: {
        paddingTop: 20
    }
});

const RepositoryItem = ({ item, detailsPage }) => {
    const handleClick = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container} testID="repoItem">
            <View style={styles.repoContent}>
                <Image source={{ uri: item.ownerAvatarUrl }} style={styles.img} />
                <View style={styles.repoInfo}>
                    <Text style={styles.name} fontSize="subheading" fontWeight="bold" testID="name">
                        {item.fullName}
                    </Text>
                    <Text style={styles.description} testID="description">
                        {item.description}
                    </Text>
                    <Text style={styles.language} fontSize="subheading" fontWeight="bold" testID="language">
                        {item.language}
                    </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RepoFooterItem
                    feedback={item.stargazersCount}
                    name="Stars"
                    testID="stars"
                />
                <RepoFooterItem
                    feedback={item.forksCount}
                    name="Forks"
                    testID="forks"
                />
                <RepoFooterItem
                    feedback={item.reviewCount}
                    name="Reviews"
                    testID="reviews"
                />
                <RepoFooterItem
                    feedback={item.ratingAverage}
                    name="Rating"
                    testID="ratings"
                />
            </View>
            <View style={styles.button}>
                {detailsPage ? <Button title="Open in GitHub" onPress={() => handleClick(item.url)} /> : null}
            </View>
        </View>
    );
};

export default RepositoryItem;