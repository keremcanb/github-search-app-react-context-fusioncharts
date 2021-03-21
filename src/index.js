import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { GithubProvider } from './context/context';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-52towbdd.eu.auth0.com"
      clientId="TaWQe2bKsrj6oJnzRc6TMwdwxJyNenyP"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
