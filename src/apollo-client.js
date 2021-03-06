import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { ApolloLink } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const Client = ({token}) => {

    const httpLink = new HttpLink({
        uri: process.env.REACT_APP_GRAPHQL_SERVER,
    })

    const wsLink = new GraphQLWsLink(createClient({
        url: process.env.REACT_APP_GRAPHQL_WEBSOCKET,
        connectionParams: {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            }
        },
    }));

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        }
    });

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );

    const client = new ApolloClient({
        link: ApolloLink.from([authLink, splitLink]),
        cache: new InMemoryCache()
    });

    return (client);
}

export default Client;



