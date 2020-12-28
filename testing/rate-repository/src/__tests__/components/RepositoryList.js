import React from 'react';
import { RepositoryListContainer } from '../../components/RepositoryList';
import { render } from '@testing-library/react-native';
import { shortNum } from '../../utils/convertNum';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const fullNames = getAllByTestId('name');
      const description = getAllByTestId('description');
      const language = getAllByTestId('language');
      const stargazersCount = getAllByTestId('stars');
      const ratingAverage = getAllByTestId('ratings');
      const forksCount = getAllByTestId('forks');
      const reviewCount = getAllByTestId('reviews');
      const repos = getAllByTestId('repoItem');

      expect(repos.length).toBe(2);
      expect(fullNames.length).toBe(2);

      expect(fullNames[0]).toHaveTextContent(repositories.edges[0].node.fullName);
      expect(fullNames[1]).toHaveTextContent(repositories.edges[1].node.fullName);

      expect(description[0]).toHaveTextContent(repositories.edges[0].node.description);
      expect(description[1]).toHaveTextContent(repositories.edges[1].node.description);

      expect(language[0]).toHaveTextContent(repositories.edges[0].node.language);
      expect(language[1]).toHaveTextContent(repositories.edges[1].node.language);

      expect(stargazersCount[0]).toHaveTextContent(shortNum(repositories.edges[0].node.stargazersCount));
      expect(stargazersCount[1]).toHaveTextContent(shortNum(repositories.edges[1].node.stargazersCount));

      expect(forksCount[0]).toHaveTextContent(shortNum(repositories.edges[0].node.forksCount));
      expect(forksCount[1]).toHaveTextContent(shortNum(repositories.edges[1].node.forksCount));

      expect(ratingAverage[0]).toHaveTextContent(shortNum(repositories.edges[0].node.ratingAverage));
      expect(ratingAverage[1]).toHaveTextContent(shortNum(repositories.edges[1].node.ratingAverage));

      expect(reviewCount[0]).toHaveTextContent(shortNum(repositories.edges[0].node.reviewCount));
      expect(reviewCount[1]).toHaveTextContent(shortNum(repositories.edges[1].node.reviewCount));
    });
  });
});