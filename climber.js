var child_process = require('child_process');

var zerorpc = require("zerorpc"),
async = require('async'),
events = require('events');

function Climber(port, options){
    this.port = port;
    this.options = typeof options !== 'undefined' ? options : null;
}

Climber.prototype = {
    climb : function(topic, callback){
        var climberpy = child_process.execSync('./init_server.sh');
        var e = new events.EventEmitter();
        var client = new zerorpc.Client();
        client.connect('tcp://127.0.0.1:' + this.port);

        client.invoke("climb", topic, this.options, function(err, content, more){
            if(err){
                return callback(err, null);
            }

            if(!more){
                client.close();

                return callback(null, JSON.parse(content));
            }
            else{
                content += content;
            }
        });
    },

    climb_images : function(callback){
        var e = new events.EventEmitter();
        var client = new zerorpc.Client();
        client.connect('tcp://127.0.0.1:' + this.port);

        client.invoke("climb_images", function(err, content, more){
            if(err){
                callback(err, null);
            }

            if(!more){
                client.close();
                console.log("Returning data climb images...");
                return callback(null, content);
            }
            else{
                content += content + " ";
            }
        });
    },

    climb_links : function(callback){
        var e = new events.EventEmitter();
        var client = new zerorpc.Client();
        client.connect('tcp://127.0.0.1:' + this.port);

        client.invoke("climb_links", function(err, content, more){
            if(err){
                return callback(err, null);
            }

            if(!more){
                client.close();
                console.log("Returning data climb links...");
                return callback(null, content);
            }
            else{
                content += content + " ";
            }
        });
    }
};

exports = module.exports = Climber;
