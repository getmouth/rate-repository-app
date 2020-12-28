import React from 'react';
import { FlatList, View, Text, StyleSheet, Alert } from 'react-native';
import ReviewItem from './ReviewItem';
import useGetUser from '../hooks/useGetUser';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  seperator: {
    height: 20
  },
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
  },
  searchBar: {
    marginBottom: 10,
  },
  listHeader: {
    paddingBottom: 15,
    margin: 15
  }

});

const ItemSeperator = () => <View style={styles.seperator} />;

const UserReviews = () => {

  const { user, refetch } = useGetUser({ includeReviews: true });
  const [deleteReview] = useDeleteReview();

  const confirm = (id) => {

    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteReview(id);
            refetch();
          }
        }
      ],
      { cancelable: false }
    );
  };

  const reviews = user ? user.reviews.edges.map(edge => edge.node) : [];

  if (reviews.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No reviews added yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeperator}
      renderItem={({ item }) =>
        <ReviewItem review={item} confirm={confirm} fromReviews />
      }
      keyExtractor={item => item.id}
      style={styles.container}
    />
  );
};

export default UserReviews;