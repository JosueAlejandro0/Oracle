var http = require('http');
var oracledb = require('oracledb');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("No Data Requested, so none is returned");
  res.end();
  });

  app.get('/api', function(req,res){ handleResources(req, res);} );
 
  app.get('/api/:id', function(req,res){
    var idEmpleado = req.params.id;

    handleDatabaseOperation( req, res, function (request, response, connection) {
      var selectStatement = "SELECT * from sat_ags_cayas_act_mv where ID_EMPLEADO = :id";
      connection.execute( selectStatement
      , [idEmpleado], {
      outFormat: oracledb.OBJECT // Return the result as Object
      }, function (err, result) {
      if (err) {
      console.log('Error de ejecución en query'+err.message);
      response.writeHead(500, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({
      status: 500,
      message: "Error al obtener a los empleados "+departmentIdentifier,
      detailed_message: err.message
      })
      );
      } else {
      console.log('Esta lista la respuesta de db '+result.rows);
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(result.rows));
      }
      doRelease(connection);
      }
      );
      });
      } );
      


      function handleDatabaseOperation( request, response, callback) {
        console.log(request.method + ":" + request.url );
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        response.setHeader('Access-Control-Allow-Credentials', true);
         
        console.log('Handle request: '+request.url);
        var connectString = process.env.NODE_ORACLEDB_CONNECTIONSTRING || "AGSVISTA";
        console.log('ConnectString :' + connectString);
        oracledb.getConnection(
        {
        user : process.env.NODE_ORACLEDB_USER || "Josue",
        password : process.env.NODE_ORACLEDB_PASSWORD || "JOSUE",
        connectString : connectString
        },
        function(err, connection)
        {
        if (err) {
        console.log('Error en conexión ...');
        console.log('Mensaje de Error '+err.message);
         

// Error connecting to DB
response.writeHead(500, {'Content-Type': 'application/json'});
response.end(JSON.stringify({
status: 500,
message: "Error connecting to DB",
detailed_message: err.message
}
));
return;
}
// do with the connection whatever was supposed to be done
callback(request, response, connection);
});
}
 
function handleResources(request, response) {
handleDatabaseOperation( request, response, function (request, response, connection) {
var nameEmpleado = request.query.name ||'%';
 
var selectStatement = "SELECT * FROM sat_ags_cayas_act_mv where NOMBRES like :nameEmpleado";
connection.execute( selectStatement
, [nameEmpleado], {
outFormat: oracledb.OBJECT // Return the result as Object
}, function (err, result) {
if (err) {
console.log('Error de ejecución'+err.message);
response.writeHead(500, {'Content-Type': 'application/json'});
response.end(JSON.stringify({
status: 500,
message: "Error en query",
detailed_message: err.message
})
);
} else {
console.log('db response is ready '+result.rows);
response.writeHead(200, {'Content-Type': 'application/json'});
response.end(JSON.stringify(result.rows));
}
doRelease(connection);
}
);
 
});
} //handleAllDepartments
 
function doRelease(connection)
{
connection.release(
function(err) {
if (err) {
console.error(err.message);
}
});
}





const PORT = process.env.PORT || 5000;
app.listen(5000);