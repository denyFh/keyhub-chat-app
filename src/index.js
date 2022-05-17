import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from './store/store';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  backgroundTheme: {
    bgGrey: grey[500],
  }
});

root.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Auth0Provider
            domain={process.env.REACT_APP_AUTH_DOMAIN}
            clientId={process.env.REACT_APP_AUTH_CLIENTID}
            redirectUri={process.env.REACT_APP_PROTECTED_URL}
          >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Auth0Provider >
        </Provider>
    </ThemeProvider>
  // </React.StrictMode>
);
