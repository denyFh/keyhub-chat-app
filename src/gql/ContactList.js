import { gql } from "@apollo/client";

export const GET_DATA = gql`
    subscription MyQuery($order_by: [users_order_by!] = {name: desc}, $_neq: String = "") {
        users(order_by: $order_by, where: { id: { _neq: $_neq }}) {
            id
            name
            picture
        }
    }
`;

export const GET_NEWCOMER_USER = gql`
    subscription MySubs2($order_by: [users_order_by!] = {name: desc}, $_neq: String = "") {
        users(order_by: $order_by, where: {id: {_neq: $_neq}, _and: {_or: {receivedMessages: {toUser: {id: {_eq: $_neq}, _or: {receivedMessages: {fromUser: {id: {_eq: $_neq}}}}}}}}}) {
            id
            name
            picture
            receivedMessages {
                toUser {
                    id
                }
                fromUser {
                    id
                }
            }
            sentMessages {
                fromUser {
                    id
                }
                toUser {
                    id
                }
            }
        }
    }
`;

export const GET_CONTACTED_USER = gql`
    subscription MySubs3($order_by: [users_order_by!] = {name: desc}, $_neq: String = "") {
        users(order_by: $order_by, where: {id: {_neq: $_neq}, _and: {_or: {sentMessages: {fromUser: {id: {_eq: $_neq}, _or: {sentMessages: {toUser: {id: {_eq: $_neq}}}}}}}}}) {
            id
            name
            picture
            receivedMessages {
                toUser {
                    id
                }
                fromUser {
                    id
                }
            }
            sentMessages {
                fromUser {
                    id
                }
                toUser {
                    id
                }
            }
        }
    }
`;

export const GET_USER_INFO = gql`
    query MyQuery($_eq: String = "") {
        users(where: {id: {_eq: $_eq}}) {
            id
            name
            picture
            email
            username
        }
    }
`;