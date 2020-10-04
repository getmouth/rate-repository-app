import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import RepositoryItem from './RepositoryItem';
import { useStateValue, setUser } from '../state';
import { GET_REPOSITORIES, GET_USER_INFO } from '../graphql/queries';

const styles = StyleSheet.create({
    seperator: {
        height: 20
    },
    container: {
        flex: 1
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
    },

});

const ItemSeperator = () => <View style={styles.seperator} />;

const RepositoryList = () => {
    // const { repositories } = useRepositories();
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });
    console.log(error);
    const [, dispatch] = useStateValue();
    const authUser = useQuery(GET_USER_INFO);
    const user = authUser.data
        ? authUser.data.authorizedUser
        : null;

    useEffect(() => {
        dispatch(setUser(user));
    }, [user]);

    if (loading) {
        return (
            <View style={styles.indicator}>
                <ActivityIndicator
                    size='large'
                    color="#0000ff"

                />
            </View>
        );
    }

    const repositoryNodes = data
        ? data.repositories.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeperator}
            renderItem={RepositoryItem}
            keyExtractor={item => item.id}
            style={styles.container}
        />
    );
};

export default RepositoryList;