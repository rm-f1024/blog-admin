import axios from 'axios'
import  {message} from 'antd'
import ipUrl from '../url'



axios.defaults.baseURL=ipUrl
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true; // 让ajax携带cookie


// 请求拦截器
axios.interceptors.request.use(
    config => {
      // 每次发送请求之前判断vuex中是否存在token
      // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
      // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    //   const token = window.localStorage.getItem("token");
    //   token && (config.headers.Authorization = token);
      return config;
    },
    error => {
      return Promise.error(error);
    }
  );
  axios.interceptors.response.use(
    response => {
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      if (response.status === 200) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
      if (error.response.status) {
        switch (error.response.status) {
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
          case 401:
            message.fail("身份验证失败，请关闭重新进入");
            break;
  
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
          case 403:
             message.fail("登录过期，请关闭重新进入。");
            // 清除token
            break;
  
          // 404请求不存在
          case 404:
             message.fail("您访问的网页不存在。");
            break;
          // 其他错误，直接抛出错误提示
          default:
             message.fail(error.response.data.message);
        }
        return Promise.reject(error.response);
      }
    }
  );

  /**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, param){  
   if (param!==undefined){
         url+='/'+param
   }
    return new Promise((resolve, reject) =>{    
        axios.get(url).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, params)
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}


/** 
 * put方法，对应put请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 export function put(url, params) {
  return new Promise((resolve, reject) => {
       axios.put(url, params)
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}

export function patch(url, params) {
  return new Promise((resolve, reject) => {
       axios.patch(url, params)
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}

export function _delete(url, param) {
  if (param!==undefined){
    url+='/'+param
}
  return new Promise((resolve, reject) => {
       axios.delete(url)
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}