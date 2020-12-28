import AppolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createAppolloClient = (authStorage) => {
    
    return new AppolloClient({
        request: async (operation) => {
            try {
                const accessToken = await authStorage.getAccessToken();

                operation.setContext({
                    headers: {
                        authorization: accessToken ? `Bearer ${accessToken}` : ''
                    },
                });
            } catch (err) {
                console.log(err);
            }
        },
        uri: Constants.manifest.extra.APOLLO_URI
    });
};

export default createAppolloClient;