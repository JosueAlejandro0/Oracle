process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
const axios = require('axios');
const empleado = require('../controllers/empleados.js');
var json={};
async function get(req, res, next) {
    try {
      if(req.params.id==='send'){
        req.params.string=req.params.id;
        req.params.id=undefined;
      
      }
        if(req.params.id == null || req.params.id === 'save'){
            var http = `http://cayas-ags-cayas.openshift.cpnlab/ws-cayas/rest/${req.params.uri}`;      
        }else{
            var http = `http://cayas-ags-cayas.openshift.cpnlab/ws-cayas/rest/${req.params.uri}/${req.params.id}`;        
        }
           axios.get(http)
            .then(async response => {

              
              switch(req.params.uri){
                case 'empleado':
                    if(req.params.string === 'save' || req.params.id === 'save'){     
                      for(var i = 0 ; i <=Object.keys(response.data).length-1;i++){ 
                        empleado.post(response.data[i]).then(empleado.update());
                      } 
                }  
                break;
                case 'estabid':
                  if(req.params.string==='send'){
                    response.data=allKeysToUpperCase(response.data);
                    for(var i = 0 ; i <=Object.keys(response.data).length-1;i++){ 
                     json={
                      url : 'buildings',
                      service:'ESTABID',
                      ID: response.data,
                      data : {
                        ESTABID:[response.data[i]]}
                      
                    }
                    
                   await postRES(json);
                    } 
                    
                   
                    
                  }
                       
                break;
                case 'jobcode':
                  if(req.params.string==='send'){
                    response.data=allKeysToUpperCase(response.data);
                    json={
                      url : 'jobs',
                      service:'JOBCODE',
                      ID: response.data,
                      data : {
                        JOBCODE:[response.data]}
                    }
                    postRES(json);
                  
                  }
                break;
                case 'deptid':
                  if(req.params.string==='send'){  
                    response.data=allKeysToUpperCase(response.data);
                    for(var i = 0 ; i <=Object.keys(response.data).length-1;i++){ 
                    json={
                      url : 'adminUnits',
                      service:'DEPTID',
                      ID: response.data,
                      data : {
                        DEPTID:[response.data[i]]}
                    }
                    await postRES(json);
                  }
                }
                break;
                case 'glexpense':
                  if(req.params.string==='send'){  
                    for(var i = 0 ; i <=Object.keys(response.data).length-1;i++){ 
                    response.data=allKeysToUpperCase(response.data);
                    json={
                      url : 'cerys',
                      service:'GLEXPENSE',
                      ID: response.data,
                      data : {
                        GL_EXPENSE:[response.data[i]]}
                    }
                    postRES(json);}
                  }
                break;  
              }

            
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
      next(err);
    }
  }
   
module.exports.get = get;

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
        [ req ]
          }
              }
            
            ).then(response => {
          
          if(response.data.empleados===undefined||response.data.result===undefined){
            

            


          }else{
            empleado.postRES(response.data.empleados[0]);
          }

           return response.data;
      }).catch(function (error) {
          if (error.response) {
            //The request was made and the server responded with a status code
            //that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            //The request was made but no response was received
            //`error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //http.ClientRequest in node.js
            console.log(error.request);
          } else {
            //Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });         
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function postRES(req, next) {
  try {
    var data=req.data;
    console.log(data)
      axios({ 
        method: 'POST',
        url: `https://99.95.56.11:2255/satapi/interfaces/${req.url}`, 
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
              
        data:data      
          
              }
            
            ).then(response => {
              console.log(data)
           console.log(response.data.details);
              for(var i = 0 ; i <=Object.keys(response.data).length-1;i++){ 
              
            /*    json= {
                  SERVICIO: req.service,
                  ID_SERVICIO: req.ID[i].id,
                  SUCCESS_INFO: response.data.details.success
                 }
            console.log(json)                 
                */
              } 


      }).catch(function (error) {
          if (error.response) {
            //The request was made and the server responded with a status code
            //that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            //The request was made but no response was received
            //`error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //http.ClientRequest in node.js
            console.log(error.request);
          } else {
            //Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });         
  } catch (err) {
    next(err);
  }
}

module.exports.postRES = postRES;


function allKeysToUpperCase(obj) {
  var output = {};
  for (i in obj) {
      if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
          output[i.toUpperCase()] = allKeysToUpperCase(obj[i]);
      } else {
          output[i.toUpperCase()] = obj[i];
      }
  }
  return output;
}