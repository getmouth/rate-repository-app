import AppolloClient from 'apollo-boost';

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
        uri: process && process.env && process.env.APOLLO_URI
    });
};

export default createAppolloClient;