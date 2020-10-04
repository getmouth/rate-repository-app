import { gql } from 'apollo-boost';

export const AUTHORIZE_USER = gql`
    mutation mutate($username: String!, $password: String!) {
        authorize(credentials: {username: $username, password: $password}) {
            accessToken
        }
    }
    
`;