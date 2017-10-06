'use strict';

const Hapi = require('hapi');
const mysql  = require('mysql');
var x = [] ;

//Creating a connection with db
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'lia'
});


const server = new Hapi.Server();

// Setting the port 
server.connection({ port: 3000, host: 'localhost' });
connection.connect();
 


// Get request
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        
        connection.query('SELECT * FROM lia.users', function (error, results, fields) {
          if (error) throw error;
          console.log(results);
          
          results.forEach( function (arrayItem)
            {
               x.push(arrayItem.username)        
            });
           reply(x[0].email);
		   console.log(x[0]);
        });
         
    }
});

// GET request for the specific user
server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {

        connection.query('SELECT * FROM lia.users', function (error, results, fields) {
          if (error) throw error;
          console.log(results)
          results.forEach( function (arrayItem)
            {
              if(encodeURIComponent(request.params.name) === arrayItem.username){
                 reply('The email address of the current is, ' + arrayItem.email);
              }       
            });
          
        });

        // reply('The current user'/'s email is, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

// connection.end();