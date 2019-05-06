const axios = require('axios');
const empleado = require('../controllers/empleados.js');
async function get(req, res, next) {
    try {
        if(req.params.id == null || req.params.id === 'save'){
            var http = `http://cayas-ags-cayas.openshift.cpnlab/ws-cayas/rest/${req.params.uri}`;      
        }else{
            var http = `http://cayas-ags-cayas.openshift.cpnlab/ws-cayas/rest/${req.params.uri}/${req.params.id}`;        
        }
          await axios.get(http,{         
        })
            .then(response => {
              if(req.params.string === 'save' || req.params.id === 'save'){     
                    for(var i = 0 ; i <=Object.keys(response.data).length-1;i++){ 
                      empleado.post(response.data[i]).then(empleado.update());
                    } 
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
