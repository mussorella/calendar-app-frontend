npm install react router dom
npm install big calendar
npm install date-fns
npm install react-datepicker --save
npm install --save react-modal
npm install sweetalert2
npm install @reduxjs/toolkit
npm install react-redux




//development pasos
1_ renombrar el archivo env.template por .env
2_hacer los cambios en las variables de entorno
"""
VITE_API_URL= http://localhost:4000/api
"""

//para conectar con el backend
//npm i axios
//crear carpeta api calendarapi.js




//generar version de produccion
//npm run build
//creamos.env.production y le ponemos las variables de entorno
//le damos devuelta build
//copiamos la carpeta dist y la pegamos en el backend en la carpeta public

//solucionar problema de ruta:
//en calendar app cambiamos el browser router por hashrouter
//o sino vamos al backend y hacemos un "comodin" del index, para que esto no suceda, copiamos en el index.js de raiz:
app.get('*', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})




