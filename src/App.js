import logo from './logo.svg';
import introgif from './assets/introtyping.gif';

import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button'
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
    return (
      <div className="flex flex-col items-center content-center justify-center h-full">
        <img src={introgif} alt="IntroGif" />
        <p className='text-2xl text-black'>Working on your Hub..</p>
      </div>
    )
  }

  getIdTokenClaims().then(resp => {
    if (resp) {
      setToken(resp.__raw);
    }
    console.log(resp);
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
          <div className="mx-[5vw] my-5 flex justify-center lg:my-10">
            <div className="w-full max-w-[1100px]">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <img className="w-8 h-8 bg-black rounded" src={logo} alt="" />
                  <span className={`text-2xl text-black}`}>Keyhub</span>
                </div>
                <div className="flex items-center">
                  {/* <ToggleDarkMode></ToggleDarkMode> */}
                  <a
                    href="https://github.com/denyFh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-xl text-black`}
                  >
                    <span>Github</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-10 md:mt-5 md:flex-row md:gap-5 lg:mt-10">
                <div className="flex-1">
                  <img className="w-full h-auto" src="/illustration.svg" alt="" />
                </div>

                <div className="flex flex-col items-center flex-1 gap-4 mt-12 md:items-start lg:mt-24">
                  <h1 className={`text-3xl text-center md:text-left md:text-4xl text-black`}>
                    The best place for messaging
                  </h1>
                  <p className={`text-xl text-center md:text-left md:text-2xl text-black`}>
                    It's free, fast and secure. We make it easy and fun to stay
                    close to your favourite people.
                  </p>

                  <Button
                    variant="contained"
                    color="primary"
                    className="App-link"
                    onClick={() => { loginWithRedirect() }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </ApolloProvider>
  );
}

export default App;