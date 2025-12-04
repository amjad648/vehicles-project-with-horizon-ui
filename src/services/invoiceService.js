import api from '../common/axiosInstance';
 
const INVOICES_BASE_ENDPOINT = '/invoices';

// export function getInvoices () {
//  return api.get(INVOICES_BASE_ENDPOINT).then(response => response.data.content)
//     .catch((error) => {
//    console.error('Error to get invoices data:', error);
//    return[];

//  });
// };


export function getInvoicesById (id) {
  console.log("Fetching invoices for vehicle ID:", id);
  
  return api.get(`${INVOICES_BASE_ENDPOINT}?vehicleId=${id}`).then(response => response.data.content)
  .catch((error) => {
 console.error('Error to get invoices data by Id:', error);
 return [];

  });
};

export function getInvoices (filters) {
  const params = new URLSearchParams(filters).toString();
  const url = params ? `${INVOICES_BASE_ENDPOINT}?${params}` : INVOICES_BASE_ENDPOINT;

  return api.get(url)
    .then(res => res.data.content)
    .catch(err => {
      console.error('Error to get invoices:', err);
      return [];
    });
};

export function getInvoiceById(invoiceId) {
  return api
    .get(`${INVOICES_BASE_ENDPOINT}/${invoiceId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`Error fetching invoice ${invoiceId}:`, error);
      throw error;
    });
}