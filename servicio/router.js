const express = require('express');
const router = new express.Router();
const empleados = require('../controllers/empleados.js');
const uri = require('../servicio/axios.js'); 
router.route('/empleado/:id?/:string?')
  .get(empleados.get);
  

router.route('/uri/:uri?/:id?/:string?')
 .get(uri.get);
module.exports = router;