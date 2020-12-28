import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW, {
        onError: (error) => {
            if (error.networkError) {
                throw new Error(networkError.result.errors[0].message);
            }

            if (error.graphQLErrors.length > 0) {
                throw new Error(error.graphQLErrors[0].message);
            }
        }
    });

    const createReview = async ({ ownerName, repositoryName, rating, text }) => {

        const { data } = await mutate({ variables: { ownerName, repositoryName, rating, text } });

        return data;
    };

    return [createReview, result];
};

export default useCreateReview;