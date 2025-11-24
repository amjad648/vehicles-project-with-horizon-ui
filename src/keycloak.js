import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://auth.cmt.dev.hqdevelops.com/',
  realm: 'cmt',
  clientId: 'cmt-backoffice',
});

export default keycloak;