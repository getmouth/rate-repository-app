import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY_DETAILS } from '../graphql/queries';

const useRepository = (variables) => {

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY_DETAILS, {
        fetchPolicy: 'cache-and-network',
        variables,

    });

    const handleFetchMore = () => {

        const canFetchMore =
            !loading && data && data.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            query: GET_REPOSITORY_DETAILS,
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repository: {
                        ...fetchMoreResult.repository,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [
                                ...previousResult.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges
                            ]
                        }
                    }
                };

                return nextResult;
            }
        });
    };

    return {
        repository: data ? data.repository : undefined,
        loading,
        fetchMore: handleFetchMore,
        ...result
    };
};

export default useRepository;