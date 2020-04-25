import axios from 'axios';
import {
  Loading,
  Message,
  MessageBox
} from 'element-ui';
import store from './store/index';
import router from './router/index';
import { sessionStorage } from 'src/assets/js/storage';

if (!store.state.token) {
  store.commit('SET_TOKEN', sessionStorage.getItem('token'));
}

// axios 配置


var loadingInstance;

// 请求拦截器
axios.interceptors.request.use(function (config) {
    console.log('!!!')

  //请求头转换为表单形式
  
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  
    config.transformRequest = [function (data) {
  
   // 在请求之前对data传参进行格式转换
  
  ​    data = Qs.stringify(data)
  
  ​    return data
  
    }]
  
    return config
  
  }, function (error) {
  
    return Promise.reject(error)
  
  })
  

// 响应拦截器
httpAccount.interceptors.response.use(res => {
  loadingInstance.close();
  console.log(res);
  return res.data;
}, error => {
  loadingInstance.close();
  if (error && error.response) {
    console.log(error.response);
    
    switch (error.response.status) {
      // 401 token失效
      case 401:
        MessageBox.alert('身份信息已过期，请重新登陆', '提示', {
          confirmButtonText: '重新登陆',
          showClose: false,
          type: 'error',
          callback: action => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }
        });
        break;
      
      // 403 服务器拒绝访问
      case 403:
        router.push('/error/403');
        break;
      
      // 404 访问的资源不存在
      case 404:
        router.push('/error/404');
        break;
      
      // 500 服务器错误
      case 500:
        router.push('/error/500');
        break;
    }
    
    return Promise.reject(error);
  }
});

