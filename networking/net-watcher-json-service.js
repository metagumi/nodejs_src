'use strict';
const

    fs = require('fs'),
    net = require('net'),

    filename = process.argv[2],

    server = net.createServer(function(connection) {

        // reporting
        console.log('Subscriber connected.');
        //connection.write("Now watching '" + filename + "' for changes...\n");
        connection.write(JSON.stringify({
            type: 'watching',
            file: filename
        }) + '\n');

        // watcher setup
        let watcher = fs.watch(filename, function() {
            var dateFormat = require('dateformat');
            var now = new Date();
            //connection.write("File '" + filename + "' changed: " + dateFormat(now,
            //    "dddd, mmmm dS, yyyy, h:MM:ss TT")  + "\n");
            connection.write(JSON.stringify({
                type: 'changed',
                file: filename,
                timestamp: Date.now()
            }) + '\n');
        });

        // cleanup
        connection.on('close', function() {
            console.log('Subscriber disconnected.');
            watcher.close();
        });
    });

    if (!filename) {
        throw Error('No target filename was specified.');
    }

    server.listen(5432, function() {
        console.log('Listening for subscribers...');
    });
