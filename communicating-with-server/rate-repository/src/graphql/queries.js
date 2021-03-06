import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query {
    repositories {
        edges {
            node {
            createdAt,
            description,
            forksCount,
            fullName,
            id,
            language,
            name,
            ownerAvatarUrl,
            ownerName,
            ratingAverage,
            reviewCount,
            stargazersCount
            }
        }
    }
}`;

export const GET_USER_INFO = gql`
    query {
        authorizedUser {
            username,
            id
        }
    }
`;