import { gql } from 'apollo-boost';

export const REPO_DETAILS = gql`
fragment repositoryDetails on Repository {
    createdAt
    description
    forksCount
    fullName
    id
    language
    name
    url
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
}
`;