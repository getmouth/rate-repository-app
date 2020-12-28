import { gql } from 'apollo-boost';

export const AUTHORIZE_USER = gql`
    mutation mutate($username: String!, $password: String!) {
        authorize(credentials: {username: $username, password: $password}) {
            accessToken
        }
    }
    
`;

export const CREATE_REVIEW = gql`
    mutation mutate($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String) {
        createReview(review: {
            ownerName: $ownerName,
            repositoryName: $repositoryName,
            rating: $rating,
            text: $text
            }) {
            repositoryId
        }
    }
    
`;

export const CREATE_USER = gql`
    mutation mutate($username: String!, $password: String!) {
        createUser(user: {username: $username, password: $password}) {
            id,
            username
        }
    }
`;

export const DELETE_REVIEW = gql`
    mutation mutate($id: ID!) {
        deleteReview(id: $id)
    }
`;