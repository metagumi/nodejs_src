"use strict"
const
    net = require('net'),


    server = net.createServer(function(connection) {
        console.log('Subscriber connected');

        // send the first chunk immediately
        connection.write('{"type":"changed","file":"targ');

        // after a one second delay, send the other chunk
        let timer = setTimeout(function() {
            connection.write('et.txt","timestamp":"1358175758495}"' + "\n");
            connection.end();
        }, 1000);

        // clear timer when the connection ends
        connection.on('end', function() {
            clearTimeout(timer);
            console.log('Subscriber disconnected');
        });
    });
    server.listen(5432, function() {
        console.log('Test server listening for subscribers...');
    });


    //  replacement for code above
    'use strict'​;
​ 	​const​ server = require(​'net'​).createServer(connection => {
​ 	  console.log(​'Subscriber connected.'​);
​ 	
​ 	  ​// Two message chunks that together make a whole message.​
​ 	  ​const​ firstChunk = ​'{"type":"changed","timesta'​;
​ 	  ​const​ secondChunk = ​'mp":1450694370094}​​\​​n'​;
​ 	
​ 	  ​// Send the first chunk immediately.​
​ 	  connection.write(firstChunk);
​ 	
​ 	  ​// After a short delay, send the other chunk.​
​ 	  ​const​ timer = setTimeout(() => {
​ 	    connection.write(secondChunk);
​ 	    connection.end();
​ 	  }, 100);
​ 	
​ 	  ​// Clear timer when the connection ends.​
​ 	  connection.on(​'end'​, () => {
​ 	    clearTimeout(timer);
​ 	    console.log(​'Subscriber disconnected.'​);
​ 	  });
​ 	});
​ 	
​ 	server.listen(60300, ​function​() {
​ 	  console.log(​'Test server listening for subscribers...'​);
​ 	});