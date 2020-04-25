import axios from 'axios';
import qs from 'qs';
axios.defaults.withCredentials = true;
const instance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});
 
export default {
  userLogin (data, headers) {
    return instance.post('/account/user/login', qs.stringify(data), {
      headers: headers
    });
  },
  userLogout () {
    return instance.post('/account/user/logout');
  },
  upload (formData, headers) {
    return instance.post('/object/file/upload', formData,  {
      headers: headers
    });
  },
  insertClinicals(data, headers) {
    return instance.post('/object/clinical/', qs.stringify(data),  {
      headers: headers
    });
  },
  insertIndividuals(data, headers) {
    return instance.post('/object/individual', qs.stringify(data),  {
      headers: headers
    });
  },
  insertTissues(data, headers) {
    return instance.post('/object/tissue', qs.stringify(data),  {
      headers: headers
    });
  },
  insertDatas(data, headers) {
    return instance.post('/object/data', qs.stringify(data),  {
      headers: headers
    });
  },
  updateClinicals(data, headers) {
    return instance.post('/object/clinical/update', qs.stringify(data),  {
      headers: headers
    });
  },
  updateIndividuals(data, headers) {
    return instance.post('/object/individual/update', qs.stringify(data),  {
      headers: headers
    });
  },
  updateTissues(data, headers) {
    return instance.post('/object/tissue/update', qs.stringify(data),  {
      headers: headers
    });
  },
  getIndividuals(params) {
    return instance.get('/object/individual',params);
  },
  getClinicals(params) {
    return instance.get('/object/clinical',params);
  },
  getTissues() {
    return instance.get('/object/tissue');
  },
  deleteIndividual(id) {
    return instance.delete('/object/individual/'+id);
  },
  deleteTissue(id) {
    return instance.delete('/object/tissue/'+id);
  },
  deleteClinical(id) {
    return instance.delete('/object/clinical/'+id);
  },
};
