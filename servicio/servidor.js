const http = require('http');
const morgan = require('morgan');
const express = require('express');
const webServerConfig = require('../config/servidor.js');
const router = require('./router.js');
let httpServer;
 
function TestServer() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);
    app.arguments(morgan('combined'));
    app.use('/api', router);
 
    httpServer.listen(webServerConfig.PORT)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.PORT}`);
 
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}
 
module.exports.TestServer = TestServer;

function close() {
    return new Promise((resolve, reject) => {
      httpServer.close((err) => {
        if (err) {
          reject(err);
          return;
        }
   
        resolve();
      });
    });
  }
   
  module.exports.close = close;