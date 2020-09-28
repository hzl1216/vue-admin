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
  insertDrugs(data, headers) {
    return instance.post('/object/drug', qs.stringify(data),  {
      headers: headers
    });
  },
  insertModels(data, headers) {
    return instance.post('/object/model', qs.stringify(data),  {
      headers: headers
    });
  },
  insertTasks(data, headers) {
    return instance.post('/object/task', qs.stringify(data),  {
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
  updateDrugs(data, headers) {
    return instance.post('/object/drug/update', qs.stringify(data),  {
      headers: headers
    });
  },
  updateModels(data, headers) {
    return instance.post('/object/model/update', qs.stringify(data),  {
      headers: headers
    });
  },
  updateStatus(data, headers) {
    return instance.post('/object/task/update', qs.stringify(data),  {
      headers: headers
    });
  },
  getIndividuals(params) {
    return instance.get('/object/individual',params);
  },
  getClinicals(params) {
    return instance.get('/object/clinical',params);
  },
  getTissues(params) {
    return instance.get('/object/tissue',params);
  },
  getDatas(params) {
    return instance.get('/object/data',params);
  },
  getDrugs(params) {
    return instance.get('/object/drug',params);
  },
  getModels(params) {
    return instance.get('/object/model',params);
  },
  getTasks(params) {
    return instance.get('/object/task',params);
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
  deleteData(params) {
    return instance.delete('/object/data/',params);
  },
  deleteDrug(id) {
    return instance.delete('/object/drug/'+id);
  },
  deleteModel(id) {
    return instance.delete('/object/model/'+id);
  },
};
