
// 设置  axios 的地址 
import axios from 'axios'
// 先定义一个对象
const HttpTool = {}
HttpTool.install =(Vue)=>{
    axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
    Vue.prototype.$http=axios
    

}
export default HttpTool