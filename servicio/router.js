const express = require('express');
const router = new express.Router();
const empleados = require('../controllers/empleados.js');
 
router.route('/empleados/:id?')
  .get(empleados.get)
  .post(empleados.post)
  .put(empleados.put)
  .delete(empleados.delete);
module.exports = router;