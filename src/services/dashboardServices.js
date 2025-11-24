import api from '../common/axiosInstance.js';

const API_ENDPOINT = '/backoffice/analytics/dashboard';

export const fetchDashboardAnalytics = () => {
  return api.get(API_ENDPOINT).then(res => res.data)
  .catch(err => {
    console.error('Error to get data of dashboard:' , err);
     
     return [];

  });
};