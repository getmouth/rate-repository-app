import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';

export const useDeleteReview = () => {

    const [mutate] = useMutation(DELETE_REVIEW, {
        onError: (error) => {
            if (error.networkError) {
              console.error(networkError.result.errors[0].message);
            }
            if (error.graphQLErrors.length > 0) {
              console.error(error.graphQLErrors[0].message);
            }
        }
    });

    const deleteReview = async (id) => {
        await mutate({variables: { id: id}});
    };

    return [deleteReview];
};

export default useDeleteReview;

