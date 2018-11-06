
// 设置  axios 的地址 
import axios from 'axios'
// 先定义一个对象
const HttpTool = {}
HttpTool.install =(Vue)=>{
    axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
    // 添加请求拦截器
axios.interceptors.request.use(function (config) {

    // 在发送请求之前做些什么
    const AUTH_TOKEN =sessionStorage.getItem('token')
    config.headers.common["Authorization"] = AUTH_TOKEN;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
   
    Vue.prototype.$http=axios
    

}
export default HttpTool