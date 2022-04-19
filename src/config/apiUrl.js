const {NODE_ENV} = process.env

const local= 'localhost:7001'
const ipUrl = NODE_ENV=='production'?  'http://106.52.41.19/api/admin':`http://${local}/admin`
// const ipUrl = `http://${local}/api/admin`

let servicePaths ={
    checkLogin:ipUrl+'/checkLogin',//获取全部文章列表
    type:ipUrl+'/type',//获取全部文章列表
}
export default servicePaths