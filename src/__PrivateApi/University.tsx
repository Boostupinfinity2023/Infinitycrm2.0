import debounce from 'lodash.debounce';
import jwt from '../getLoggedUser/GetUserInfomation';
import { university_Api } from '../APIurl/url';

const debouncedUniversityRecord = async (search_input: string, currentPage: any, itemsPerPage: any, totalPages: any, Filtercountry: any) => {
  try {
    const jwttoken = jwt('jwt');
    const apiGetdata = `?action=getuniversitydata&U=${search_input}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&totalPages=${totalPages}&Filtercountry=${Filtercountry}`;
    const url = university_Api + apiGetdata;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authenticate: `Bearer ${jwttoken}`,
      },
      body: JSON.stringify({
        PAGE_REQUEST: 'GET_UNIVERSITY_DATA_ADMIN',
      }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
const UniversityRecord = async (search_input: string, currentPage: any, itemsPerPage: any, totalPages: any, Filtercountry: any) => {
  return await debouncedUniversityRecord(search_input, currentPage, itemsPerPage, totalPages, Filtercountry);
};

export default UniversityRecord;