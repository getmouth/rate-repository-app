import React from 'react';
import { useParams } from 'react-router-native';
import { View, StyleSheet, FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';
import genUniqueId from '../utils/genUniqueId';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    seperator: {
        height: 20
    },
});

const ItemSeperator = () => <View style={styles.seperator} />;

const RepositoryDetails = () => {
    const { repoId } = useParams();
    const { repository, fetchMore } = useRepository({ id: repoId, first: 4 });

    const onEndReached = () => {
        fetchMore();
    };

    const genId = genUniqueId();

    const reviews = repository
        ? repository.reviews.edges.map(edge => edge.node)
        : [];

    if (!reviews || reviews.length === 0) {
        return null;
    }

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => `${genId.next().value}${id}`}
            ListHeaderComponent={() => <RepositoryItem item={repository} detailsPage />}
            ItemSeparatorComponent={ItemSeperator}
            ListHeaderComponentStyle={{ marginBottom: 20 }}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
        />
    );

};

export default RepositoryDetails;