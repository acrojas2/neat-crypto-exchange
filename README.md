## neat-crypto-exchange

Para correr este proyecto hay que seguir los siguientes pasos:
 1. Clonar este repositorio en tu local
 2. Instalar las dependencias
 ```bash
 npm install
 ```
 3. En el archivo `neat-api.ts` setear la url base de la api del backend.
 4. En el archivo de `environment.development.ts`, agregar la configuracion de firebase, que lo encuentras en tu consola de firebase (debes iniciar un proyecto de firebase para esto):
 ```bash
export const environment = {
  production: false,
  firebaseConfig: {
    "projectId": "<YOUR_PROJECT_ID>",
    "appId": "<YOUR_APP_ID>",
    "storageBucket": "<YOUR_STORAGE_BUCKET>",
    "apiKey": "<YOUR_API_KEY>",
    "authDomain": "<YOUR_AUTH_DOMAIN>",
    "messagingSenderId": "<YOUR_MESSAGING_SENDER_ID>",
    "measurementId": "<YOUR_MEASUREMENT_ID>"
  }
};
``` 
 
 5. Levantar la aplicación
```bash
npm start
```
