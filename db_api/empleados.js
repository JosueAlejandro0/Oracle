const database = require('../servicio/database.js');
 
const baseQuery = 
 `select ID_PERSONA "id_persona",
    ID_EMPLEADO "id_empleado",
    RFC_CORTO "rfc_corto",
    PRIMER_APELLIDO "primer_apellido",
    SEGUNDO_APELLIDO "segundo_apellido",
    NOMBRES "nombres",
    FECHA_NACIMIENTO "fecha_nacimento",
    SEXO "sexo",
    ESTADO_CIVIL "estado_civil",
    TIENE_HIJOS "tiene_hijos",
    RFC "rfc",
    CURP "curp",
    NO_ISSSTE "no_issste",
    TIPO_SANGRE "tipo_sangre",
    CODIGO_DEPARTAMENTO "codigo_departamento",
    INMUEBLE "inmueble",
    NIVEL_JERARQUICO "nivel_jerarquico",
    TIPO_PUESTO "tipo_puesto",
    CLASIFICACION_PUESTO "clasificacion_puesto",
    CODIGO_PUESTO "codigo_puesto",
    ESTATUS "estatus",
    FECHA_ALTA "fecha_alta",
    CORREO_ELECTRONICO "correo_electronico",
    FECHA_BAJA "fecha_baja",
    MOTIVO_BAJA "motivo_baja",
    ADMINISTRACION_GENERAL "administracion_general",
    UNIDAD_ADMINISTRATIVA "unidad_administrativa",
    DEPENDENCIA_DIRECTA "dependencia_directa",
    RFC_CORTO_JEFE "ref_corto_jefe",
    DT_REGISTRO "dt_registro"
  from sat_ags_cayas_act_mv`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.id = context.id;
 
    query += `\nwhere id_persona = :id `;

  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;