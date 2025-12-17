import api from '../common/axiosInstance.js';

const API_ENDPOINT = '/backoffice/vehicles';

// export const fetchVehicles = () => {
//   return api.get(API_ENDPOINT).then(res => res.data.vehicles)
//   .catch(err => {
//     console.error('Error to get vehicles data:' , err);
     
//      return [];

//   });
// };

export const fetchVehicles = (filters) => {
  const params = new URLSearchParams(filters).toString();
  const url = params ? `${API_ENDPOINT}?${params}` : API_ENDPOINT;

  return api.get(url).then(res => res.data.vehicles)
  .catch(err => {
    console.error('Error to get vehicles data:' , err);
     
     return [];

  });
};