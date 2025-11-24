import api from '../common/axiosInstance';
 
const INVOICES_BASE_ENDPOINT = '/invoices';

export function getInvoices () {
 return api.get(INVOICES_BASE_ENDPOINT).then(response => response.data.content)
    .catch((error) => {
   console.error('Error to get invoices data:', error);
   return[];

 });
};


export function getInvoicesById (id) {
  console.log("Fetching invoices for vehicle ID:", id);
  
  return api.get(`${INVOICES_BASE_ENDPOINT}?vehicleId=${id}`).then(response => response.data.content)
  .catch((error) => {
 console.error('Error to get invoices data by Id:', error);
 return [];

  });
};