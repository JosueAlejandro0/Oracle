var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');

oracledb.getConnection(
{
user : dbConfig.user,
password : dbConfig.password,
connectString : dbConfig.connectString
},
function(err, connection)
{
if (err) {
console.error(err.message);
return;
}
connection.execute();

console.log('Connection was successful!');

connection.close(
function(err)
{
if (err) {
console.error(err.message);
return;
}
});
});