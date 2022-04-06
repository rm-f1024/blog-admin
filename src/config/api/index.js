import { get,post ,put,patch,_delete} from "../http";
export const addArticle = (param) =>  post('/article',param)
export const updateArticle = (param) =>  put('/article',param)
export const publishArticle = (param) =>  patch('/article',param)

export const getAllArticle = () =>  get('/allarticle')
export const deleteArticle = (param) =>  _delete('/article',param)
