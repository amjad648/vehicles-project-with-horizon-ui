

import axios from 'axios';
import keycloak from '../keycloak';

const api = axios.create({
   baseURL: 'https://backend.cmt.dev.hqdevelops.com/api', // your backend API base URL
});


// Add request interceptor

api.interceptors.request.use(
  async (config) => {
    // If Keycloak is not initialized or not authenticated, skip adding token

    if (!keycloak || !keycloak.authenticated) {
      console.warn('⚠️ Keycloak not ready — request sent without token');
      return config;
    }

    try {
      // Refresh token if expiring soon (e.g., <30s left)
      await keycloak.updateToken(30);

      // Attach token to the Authorization header
      config.headers.Authorization = `Bearer ${keycloak.token}`;
      console.log('✅ Token attached successfully');
    } catch (err) {
      console.error('❌ Failed to refresh token:', err);
      keycloak.logout();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
