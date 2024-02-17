//estamos inciando la conexion del frontend con el backend de la app




export const getEnvVariables = () => {
  
  //import.meta.env;
  
    return {
        //...import.meta.env
        VITE_API_URL: import.meta.env.VITE_API_URL
    }
    
  
}
