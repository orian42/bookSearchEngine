import { gql } from '@apollo/server';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            savedBooks
        }
    }
`;