import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
    subscription MyQuery($where: messages_bool_exp = {}) {
        messages(where: $where, order_by: {created_at: asc}) {
            id
            fromUserId
            message
            fromUser {
                name
                picture
            }
            created_at
        }
    }
`;

export const INSERT_MESSAGES = gql`
    mutation MyMutation($toUserId: String = "", $message: String = "", $fromUserId: String = "") {
        insert_messages_one(
            object: {
                fromUserId: $fromUserId
                toUserId: $toUserId
                message: $message
            }
        ) {
            id
        }
    }
`;