const {NODE_ENV} = process.env

const local= 'localhost:7001'
const ipUrl = NODE_ENV==='production'?  'http://106.52.41.19/api/admin':`http://${local}/api/admin`
export default ipUrl