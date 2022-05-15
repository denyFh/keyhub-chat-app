import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from './store/store';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { orange, green } from '@mui/material/colors';


const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  status: {
    danger: orange[500],
    success: green[400],
  },
});

root.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH_DOMAIN}
          clientId={process.env.REACT_APP_AUTH_CLIENTID}
          redirectUri={process.env.REACT_APP_BASE_URL}
        >
          <App />
        </Auth0Provider >
      </Provider>
    </ThemeProvider>
  // </React.StrictMode>
);
