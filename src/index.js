// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import './assets/css/App.css';

// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import keycloak from './keycloak.js';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{ onLoad: 'login-required' }}
  >
    <BrowserRouter>
    
    <App />
    </BrowserRouter>
  </ReactKeycloakProvider>
);

