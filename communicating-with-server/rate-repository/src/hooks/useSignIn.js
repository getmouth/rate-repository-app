
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { AUTHORIZE_USER } from '../graphql/mutations';
import { useAuthStorage } from '../contexts';
import { useStateValue, loginUser } from '../state';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [, dispatch] = useStateValue();
    const ApolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHORIZE_USER, {
        onError: (error) => {
            if (error.networkError) {
                throw new Error(networkError.result.errors[0].message);
            }
            if (error.graphQLErrors.length > 0) {
                throw new Error(error.graphQLErrors[0].message);
            }
        }
    });

    const signIn = async ({ username, password }) => {

        const { data } = await mutate({ variables: { username, password } });
        dispatch(loginUser(data.authorize.accessToken));
        authStorage.setAccessToken(data.authorize.accessToken);

        ApolloClient.resetStore();
        return data;
    };

    return [signIn, result];
};

export default useSignIn;