const express = require('express');
const router = new express.Router();
const empleados = require('../controllers/empleados.js');
const uri = require('../servicio/axios.js'); 
router.route('/empleado/:id?')
  .get(empleados.get)
/* .post(empleados.post)
  .put(empleados.put)
  .delete(empleados.delete)*/;
  

router.route('/uri/:uri?/:id?/:string?')
 .get(uri.get);
module.exports = router;
