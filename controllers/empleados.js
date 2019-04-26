const empleados = require('../db_api/empleados.js');
//-------------------------------------- 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = parseInt(req.params.id, 10);
 
    const rows = await empleados.find(context);
 
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.get = get;
//--------------------------------------
function ObtenerEmpleado(req) {
  const empleado = {

    ID_PERSONA: req.idPersona,
    ID_EMPLEADO: req.idEmpleado,
    RFC_CORTO: req.rfcCorto,
    PRIMER_APELLIDO: req.primerApellido,
    SEGUNDO_APELLIDO: req.segundoApellido,
    NOMBRES: req.nombres,
    FECHA_NACIMIENTO: req.fechaNacimiento,
    SEXO: req.sexo,
    ESTADO_CIVIL: req.estadoCivil,
    TIENE_HIJOS: req.tieneHijos,
    RFC: req.rfc,
    CURP: req.curp,
    NO_ISSSTE: req.nombre,
    TIPO_SANGRE: req.tipoSangre,
    CODIGO_DEPARTAMENTO: req.codigoDepartamento,
    INMUEBLE: req.inmueble,
    NIVEL_JERARQUICO: req.nivelJerarquico,
    TIPO_PUESTO: req.tipoPuesto,
    CLASIFICACION_PUESTO: req.clasificacionPuesto ,
    CODIGO_PUESTO: req.codigoPuesto,
    ESTATUS: req.estatus,
    FECHA_ALTA: req.fechaAlta,
    CORREO_ELECTRONICO: req.correoElectronico,
    FECHA_BAJA: req.fechaBaja,
    MOTIVO_BAJA: req.motivoBaja,
    ADMINISTRACION_GENERAL: req.administracionGeneral,
    UNIDAD_ADMINISTRATIVA: req.unidadAdministrativa,
    DEPENDENCIA_DIRECTA: req.dependenciaDirecta ,
    RFC_CORTO_JEFE: req.rfcCortoJefe  
  };
  return empleado;
}
 
async function post(req, res, next) {
  try {
    let empleado = ObtenerEmpleado(req);
    empleado = await empleados.create(empleado);
  } catch (err) {
    console.log(err);
  }
}
module.exports.post = post;
//--------------------------------------


async function update(req, res, next) {
  try {
    await empleados.Update();
  } catch (err) {
    console.log(err);
  }
}
module.exports.update = update;