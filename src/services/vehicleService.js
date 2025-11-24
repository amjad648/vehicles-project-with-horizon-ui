import api from '../common/axiosInstance.js';

const API_ENDPOINT = '/vehicles';

export const fetchVehicles = () => {
  return api.get(API_ENDPOINT).then(res => res.data.content)
  .catch(err => {
    console.error('Error to get vehicles data:' , err);
     
     return [];

  });
};