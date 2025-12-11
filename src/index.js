import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import KeycloakProvider from "./keycloakProvider";
import "./assets/css/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <KeycloakProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </KeycloakProvider>
);


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App'
// import KeycloakProvider from 'keycloakProvider';
// import { BrowserRouter } from 'react-router-dom';
// import './assets/css/App.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <KeycloakProvider>
//     <BrowserRouter>

//     <App />

//     </BrowserRouter>
//   </KeycloakProvider>
// );

