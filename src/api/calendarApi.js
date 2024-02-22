import axios from "axios";
import { getEnvVariables } from "../helpers";
const { VITE_API_URL }= getEnvVariables()

const calendarApi= axios.create({
baseURL: VITE_API_URL
})



//todo:config interceptores
calendarApi.interceptors.request.use(config=>{
   
    config.headers={
        ...config.headers,//con esto mantengo la config de los headers
        'x-token': localStorage.getItem('token')//esta sacando el token del postman 
   }//si no hay token tira undefined y no autentica nada en el backend
   
   
    return config;
})//antes que se haga la solicitud de req, use lo q esta adentro del parentesis

export default calendarApi;