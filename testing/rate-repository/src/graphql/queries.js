import { gql } from 'apollo-boost';
import { REPO_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
query repositories(
    $order: AllRepositoriesOrderBy,
    $direction: OrderDirection,
    $search: String,
    $first: Int
    ){
    repositories(
        orderBy: $order,
        orderDirection: $direction,
        searchKeyword: $search,
        first:  $first
    ) {
        edges {
            node {
            ...repositoryDetails
            },
            cursor
        },
        pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
        }
    }
}${REPO_DETAILS}`;

export const GET_USER_INFO = gql`
    query getAuthorizedUser($includeReviews: Boolean = false) {
        authorizedUser {
            username
            id
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        rating
                        createdAt
                        text
                        user {
                            id
                            username
                        }
                        repository {
                            id
                            name
                            fullName
                        }
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    totalCount
                    hasNextPage
                }
            }
        }
    }
`;

export const GET_REPOSITORY_DETAILS = gql`
query repository($id: ID!, $first: Int) {
    
    repository(id: $id) {
        ...repositoryDetails
        reviews (first: $first) {
            edges {
                node {
                    id
                    text
                    rating
                    createdAt
                    user {
                        id
                        username
                    }
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                totalCount
                hasNextPage
            }
        }
    }
} ${REPO_DETAILS}`;

