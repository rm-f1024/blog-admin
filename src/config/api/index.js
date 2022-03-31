import { get,post ,put,patch} from "../http";
export const addArticle = (param) =>  post('/article',param)
export const updateArticle = (param) =>  put('/article',param)
export const publishArticle = (param) =>  patch('/article',param)