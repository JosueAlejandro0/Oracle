process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" 
const axios = require('axios');
 var express = require('express');
    var app = express();
    const json = {
          ID_PERSONA: '60852',
          ID_EMPLEADO: '101',
          RFC_CORTO: 'TOFE875H',
          PRIMER_APELLIDO: 'TORRES',
          SEGUNDO_APELLIDO: 'FLORES',
          NOMBRES: 'EMMANUEL ALEJANDRO',
          FECHA_NACIMIENTO: '',
          SEXO: '',
          ESTADO_CIVIL: '2',
          TIENE_HIJOS: 'NO',
          RFC: 'TOFE870505BX2',
          CURP: 'TOFE870505HNLRLM09',
          NO_ISSSTE: '123456999',
          TIPO_SANGRE: 'A+',
          CODIGO_DEPARTAMENTO: '315',
          INMUEBLE: '090150D000',
          NIVEL_JERARQUICO: '7',
          TIPO_PUESTO: 'C',
          CLASIFICACION_PUESTO: 'CFP1226051',
          CODIGO_PUESTO: 'RS5210',
          ESTATUS: 'I',
          FECHA_ALTA: '31/12/2017',
          CORREO_ELECTRONICO: 'tofe87bx2@sat.gob.mx',
          FECHA_BAJA: '31/01/2018',
          MOTIVO_BAJA: '',
          ADMINISTRACION_GENERAL: '00003',
          UNIDAD_ADMINISTRATIVA: '201',
          DEPENDENCIA_DIRECTA: '100',
          RFC_CORTO_JEFE: 'GORX808H',
          FECHA_ING_GOB_FED: '31/12/2017'  } ;
                   
   app.get('/', function (req, res) {
      res.send(post(json));
    });
    
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });
async function post(req, res, next) {
  try {

      axios({ 
        method: 'POST',
        url: 'https://99.95.56.11:2255/satapi/interfaces/employees', 
        headers: {  
          "Content-Type": "application/json",
          "Authorization": "Basic c2F0OlNAVGFwaTIwMTghIw==",
          "Accept": "*/*",
          "Cache-Control": "no-cache",
          "Host": "99.95.56.11:2255",
          "accept-encoding": "gzip, deflate",
          "content-length": "891",
          "Connection": "keep-alive",
          "cache-control": "no-cache"
                  }, 
        data: 
          {
            empleados:
        [ json ]
          }
              }
            
            ).then(response => {
          console.log(response.data.result);
          console.log(response.data.empleados);
          res.send(response.data);
           
      }).catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });         
  } catch (err) {
    //next(err);
  }
}