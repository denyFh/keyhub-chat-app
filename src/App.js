import introgif from './assets/introtyping.gif';

import Home from './screens/Home';
import Landing from './screens/Landing';
import ErrorPage from './screens/ErrorPage';

import ProtectedRoute from './ProtectedRoute';

import { useAuth0 } from "@auth0/auth0-react";
import { ApolloProvider } from '@apollo/client/react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Client from './apollo-client';


const App = () => {

  const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
  const [token, setToken] = useState("");

  getIdTokenClaims().then(resp => {
    if (resp) {
      setToken(resp.__raw);
    }
    console.log(resp);
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center content-center justify-center h-full">
        <img src={introgif} alt="IntroGif" />
        <p className='text-2xl text-black'>Working on your Hub..</p>
      </div>
    )
  };

  return (
    <ApolloProvider client={Client({ token })}>
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path="landing" element={<Landing />} />
        <Route element={<ProtectedRoute authenticated={isAuthenticated}/>}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;