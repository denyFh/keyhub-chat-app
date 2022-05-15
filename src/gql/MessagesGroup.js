import { gql } from "@apollo/client";

export const CHECK_USER_GROUPS = gql`
    subscription CekGrup($_eq: String) {
        groups(where: {members: {userId: {_eq: $_eq}}}) {
            groupName
            id
            members {
                userId
            }
        }
    }
`;

export const GET_CREATOR = gql`
    query CekCreator($_eq: String) {
        groups(where: {
            creator: {
                _eq: $_eq
            }
        }) {
            creator
            groupName
            id
        }
    }
`;

export const CREATE_GROUPS = gql`
    mutation CreateGroup($_eq: String, $groupName: String, $creator: String) {
        insert_groups_one(
            object: {
                creator: $creator, 
                groupName: $groupName, 
                members: {data: {userId: $_eq}}
            }
        ) {
            groupName
        }
    }
`;

export const INSERT_MSG_GROUP = gql`
    mutation InsertMsgGrup($fromMemberId: String = "", $groupId: String = "", $message: String = "") {
        insert_group_messages_one(
            object: {
                fromMemberId: $fromMemberId 
                groupId: $groupId
                message: $message
            }
        ) {
            id
            message
        }
    }
`;

export const GET_GROUP_MESSAGES = gql`
    subscription MySubscription2($groupId: String) {
        group_messages(order_by: {created_at: asc}, where: {groupId: {_eq: $groupId}}) {
            id
            fromMemberId
            message
            groupId
            created_at
            member {
            id
            name
            }
        }
    }
`;

export const INSERT_MEMBER_GROUP = gql`
    mutation InsertMemberGrup($selectedUser: String, $groupId: String) {
        insert_group_member_one(object: {userId: $selectedUser, groupId: $groupId}) {
            id
            groupId
            group {
            groupName
            }
        }
    }
`;

export const GET_ALLMEMBER = gql`
    query GetDataAllmember($groupId: String) {
        users {
            id
            name
        }
        group_member(where: {groupId: {_eq: $groupId}}) {
            userId
        }
    }
`;