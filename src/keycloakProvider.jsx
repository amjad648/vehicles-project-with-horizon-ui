import React, { useState, useEffect, createContext } from 'react';
import keycloak from './keycloak';

export const KeycloakContext = createContext();

const KeycloakProvider = ({ children }) => {
  const [keycloakReady, setKeycloakReady] = useState(false);

  useEffect(() => {
    keycloak
      .init({ onLoad: 'login-required', checkLoginIframe: false })
      .then(authenticated => {
        if (!authenticated) {
          keycloak.login();
        } else {
          setKeycloakReady(true);
        }
        
      })
      .catch(error => console.error('Keycloak init error:', error));
  }, []);

  if (!keycloakReady) {
    return <div>Loading Keycloak...</div>;
  }

  return (
    <KeycloakContext.Provider value={keycloak}>
      {children}
    </KeycloakContext.Provider>
  );
};

export default KeycloakProvider;