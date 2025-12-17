import api from '../common/axiosInstance.js';

const API_ENDPOINT = '/backoffice/users';

export function getUsersData (filters) {
  const params = new URLSearchParams(filters).toString();
  const url = params ? `${API_ENDPOINT}?${params}` : API_ENDPOINT;

  return api.get(url).then(res => res.data.users)
  .catch(err => {
    console.error('Error to get users data:' , err);
     
     return [];
  });
};


// export const getUsersData = () => {
//   return api.get(API_ENDPOINT).then(res => res.data.users)
//   .catch(err => {
//     console.error('Error to get vehicles data:' , err);
     
//      return [];

//   });
// };