import logo from './logo.svg';
import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import Home from './screens/Home';

import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { ApolloLink } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { useState } from 'react';

const App = () => {
  
  const { loginWithRedirect, getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
  const [token, setToken] = useState("");

  if (isLoading) {
    return <CircularProgress></CircularProgress>
  }

  getIdTokenClaims().then(resp => {
    // console.log(resp);
    if (resp) {
      setToken(resp.__raw);
    }
  })

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

  return (
    <ApolloProvider client={client}>
      {
        isAuthenticated ? (
          <Home />
        ) : (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Button
                variant="contained"
                color="primary"
                className="App-link"
                onClick={() => { loginWithRedirect() }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Login
              </Button>
            </header>
          </div>
        )
      }
    </ApolloProvider>
  );
}

export default App;