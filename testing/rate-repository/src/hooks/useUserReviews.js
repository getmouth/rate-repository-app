import { useQuery } from '@apollo/react-hooks';
import { GET_USER_REVIEWS } from '../graphql/queries';

const useUserReviews = (variables) => {

    const { data, loading, ...result } = useQuery(GET_USER_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables
    });

    return {
        reviews: data ? data.repositories : undefined,
        loading,
        ...result
    };
};

export default useUserReviews;

