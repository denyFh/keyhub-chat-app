import { gql } from "@apollo/client";

export const GET_DATA = gql`
    subscription MyQuery($order_by: [users_order_by!] = {name: desc}, $_neq: String = "") {
        users(order_by: $order_by, where: { id: { _neq: $_neq }}) {
            id
            name
            picture
        }
    }
`