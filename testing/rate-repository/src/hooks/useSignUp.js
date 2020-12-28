import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
    const ApolloClient = useApolloClient();
    const [mutate, result] = useMutation(CREATE_USER, {
        onError: (error) => {
            if (error.networkError) {
                throw new Error(networkError.result.errors[0].message);
            }
            if (error.graphQLErrors.length > 0) {
                throw new Error(error.graphQLErrors[0].message);
            }
        }
    });

    const signUp = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } });

        ApolloClient.resetStore();
        return data;
    };

    return [signUp, result];
};

export default useSignUp;