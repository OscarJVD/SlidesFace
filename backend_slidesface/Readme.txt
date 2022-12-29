# Set up the BACKEND & FRONTEND app
1. Instalar dependencias para el back (nodeback)
2. Instalar dependencias para el front (reactfront)
3. Ejecutar back con "npm run server"
4. Ejecutar front con "npm run start"
5. Crear variables de entorno en archivo .env para el back con: la conexion de bd, tokens y etc
6. Descargar mongo compass para ver la base de datos (Es equivalente a un DBveaber o un workbench)  e ingresar valo de bd para una nueva conexión 
7. Para probar las pruebas unitarias del backend corriendo "npm run test" desde la carpeta raíz

Nota: Si elimina su propio usuario debe recargar o hacer algo y se le cerrara la sesión

/*
Arreglar ruta profile/:id por [username] igual que insta y twitter
*/

Operation `users.findOne()` buffering timed out after 10000ms es por mal internet o ip en mongo atlas -> A veces es porque el internet molesta o el mongo atlas jode a horas porque es compartido por varios usuarios

/*Proxy*/
"proxy": "http://localhost:5000",
    "proxy": "http://0.0.0.0:5000",

    MONGODB_URL=mongodb+srv://ovargas:hNxahHVaLHOvmzMj@cluster0.oaook.mongodb.net/slidesfacedb?retryWrites=true&w=majority

Queda pendiente:
- Hacer flujo dinamica de mostrar y ocultar campos con un nuevo atributo cómo:
dependsOf={{
  field: 'workplace'
  activatorValues: ['','any','algo', 'all']
}} 