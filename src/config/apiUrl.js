const {NODE_ENV} = process.env
const local= '127.0.0.1:7001'//localhost:7001
const ipUrl = NODE_ENV=='production'?  'http://106.52.41.19:7001/admin':`http://${local}/admin`

let servicePath ={
    checkLogin:ipUrl+'/checkLogin',//获取全部文章列表
    type:ipUrl+'/type',//获取全部文章列表
}
export default servicePath