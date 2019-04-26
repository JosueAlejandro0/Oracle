const database = require('../servicio/database.js');

//----------------------------------------------------- 
const baseQuery = 
 `select ID_PERSONA,
    ID_EMPLEADO,
    RFC_CORTO,
    PRIMER_APELLIDO,
    SEGUNDO_APELLIDO,
    NOMBRES,
    FECHA_NACIMIENTO,
    SEXO,
    ESTADO_CIVIL,
    TIENE_HIJOS,
    RFC,
    CURP,
    NO_ISSSTE ,
    TIPO_SANGRE,
    CODIGO_DEPARTAMENTO ,
    INMUEBLE,
    NIVEL_JERARQUICO ,
    TIPO_PUESTO ,
    CLASIFICACION_PUESTO ,
    CODIGO_PUESTO,
    ESTATUS ,
    FECHA_ALTA ,
    CORREO_ELECTRONICO ,
    FECHA_BAJA ,
    MOTIVO_BAJA ,
    ADMINISTRACION_GENERAL ,
    UNIDAD_ADMINISTRATIVA ,
    DEPENDENCIA_DIRECTA ,
    RFC_CORTO_JEFE ,
    DT_REGISTRO 
  from sat_ags_cayas_act_mv`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
  if (context.id) {
    binds.id = context.id;
    query += `\nwhere ID_PERSONA = :id `;
  }
  const result = await database.simpleExecute(query, binds); 
  return result.rows;
}

module.exports.find = find;

//--------------------------------------------------------------------
const createSql =
 `BEGIN GuardarRegistros (:ID_PERSONA,
 :ID_EMPLEADO,
 :RFC_CORTO,
 :PRIMER_APELLIDO,
 :SEGUNDO_APELLIDO,
 :NOMBRES,
 :FECHA_NACIMIENTO,
 :SEXO,
 :ESTADO_CIVIL,
 :TIENE_HIJOS,
 :RFC,
 :CURP,
 :NO_ISSSTE,
 :TIPO_SANGRE,
 :CODIGO_DEPARTAMENTO,
 :INMUEBLE,
 :NIVEL_JERARQUICO,
 :TIPO_PUESTO,
 :CLASIFICACION_PUESTO ,
 :CODIGO_PUESTO,
 :ESTATUS,
 :FECHA_ALTA,
 :CORREO_ELECTRONICO,
 :FECHA_BAJA,
 :MOTIVO_BAJA,
 :ADMINISTRACION_GENERAL,
 :UNIDAD_ADMINISTRATIVA,
 :DEPENDENCIA_DIRECTA,
 :RFC_CORTO_JEFE); END;`;
async function create(emp) {
  const empleado = Object.assign({}, emp); 
  await database.simpleExecute(createSql, empleado);
  return empleado;
}
module.exports.create = create;

//-----------------------------------------------------

const UpdateSql =
 `BEGIN
 ACT_INS_SAT_AGS_CAYAS_MV();
--rollback; 
END;`;
async function Update(context) {
  let Upquery = UpdateSql;
  const binds = {};
  const result = await database.simpleExecute(Upquery, binds);
  
  
  return result;
}
module.exports.Update = Update;
