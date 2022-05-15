import { gql } from "@apollo/client";

export const UPDATE_USERNAME = gql`
    mutation MyMutation4($_eq: String, $username: String) {
        update_users(where: {id: {_eq: $_eq}}, _set: {username: $username}) {
            affected_rows
        }
    }
`;