#!/usr/bin/env node

var fs = require('fs');
var util = require('util');
var path = require('path');
var walk = require('events');
var watch = require('./main.js');
var exec = require('child_process').exec;


var argv = require('optimist').usage('Watch files in a file tree.').wrap(80).option('directory', {
    alias: 'd',
    desc: 'Define the root directory to watch, if this is not defined the program will use the current working directory.'
}).option('created', {
    alias: 'c',
    desc: 'Command to handle created files'
}).option('modified', {
    alias: 'm',
    desc: 'Command to handle modified files'
}).option('removed', {
    alias: 'r',
    desc: 'Command to handle deleted files'
}).option('all', {
    alias: 'a',
    desc: 'Command to handle all file changes'
}).option('interval', {
    alias: 'i',
    desc: 'Watcher interval'
}).option('help', {
    alias: 'h',
    desc: 'Show this message'
}).
default('interval', 150).
default('directory', process.cwd()).check(function(argv) {
    // console.log(argv);
    if(!(argv.modified || argv.removed || argv.created || argv.all)){
        throw '';
    }
    if(argv.help) {
        throw '';
    }
    if(argv.all) {
        argv.created = argv.modified = argv.removed = argv.all;
    }
}).argv;

var wrapper = function(action, cmd) {
        return function(file) {
            var command = (cmd || '');

            command = command.replace(/\$file/g, file);
            command = command.replace(/\$action/g, action);
            command = command.replace(/\$filename/g, path.basename(file));
            command = command.replace(/\$relative/g, path.relative(argv.directory, file));

            exec(command, function(err, stdout, stderr) {
                if(err !== null) {
                    console.log('command error: ' + err);
                    process.exit(1);
                } else {
                    util.puts(stdout);
                }
            });
        };
    };

watch.monitor(argv.directory, {
    interval: argv.interval
}, function(monitor) {
    if(argv.created) {
        monitor.on('created', wrapper('created', argv.created));
    }
    if(argv.modified) {
        monitor.on('changed', wrapper('changed', argv.modified));
    }
    if(argv.removed) {
        monitor.on('removed', wrapper('removed', argv.removed));
    }
});
