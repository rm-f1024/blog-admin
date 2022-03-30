import { get,post } from "../http";
export const addArticle = (param) =>  post('/article',param)