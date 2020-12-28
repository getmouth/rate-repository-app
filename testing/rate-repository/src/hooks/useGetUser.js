import { GET_USER_INFO } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const useGetUser = (variables) => {
    const { data, error, loading, refetch } = useQuery(GET_USER_INFO, {
        fetchPolicy: 'cache-and-network',
        variables
    });

    return { user: data?.authorizedUser, error, loading, refetch };
};

export default useGetUser;
