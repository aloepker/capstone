let serialport = require("serialport");
let WebSocketServer = require('ws').Server;
console.log("Starting serialport and websocket");

let port = new serialport('/dev/ttyUSB0',{//arduino needs to be connected to the correct port, USB0
baudRate:9600});
const Readline=serialport.parsers.Readline;
const parser=new Readline();
port.pipe(parser);

const SERVER_PORT = 8081;               // port number for the webSocket server
let wss = new WebSocketServer({port: SERVER_PORT}); // the webSocket server
let connections = new Array;          // list of connections to the server

port.on('open', onPortOpen);
parser.on('data', onData);
port.on('close',onClose);
port.on('error',onError);
port.write('something to arduino'); //?

function onPortOpen(){
console.log("waiting for data");
}

function onData(data){
console.log("data received: "+data);
    // if there are webSocket connections, send the serial data
    // to all of them:
    if (connections.length > 0) {
      broadcast(data);
    }
}

function onClose(){
console.log("serialport closed");
}
function onError(){
console.log("serial communication error");
}
function sendToSerial(data) { //is this variable shadowing?
    console.log("sending to serial: " + data);
    myPort.write(data);
  }

wss.on('connection', handleConnection);
 function handleConnection(client) {
  console.log("New Connection"); // you have a new client
  connections.push(client); // add this client to the connections array
 
  client.on('message', sendToSerial); // when a client sends a message,
 
  client.on('close', function() { // when a client closes its connection
    console.log("connection closed"); // print it out
    let position = connections.indexOf(client); // get the client's position in the array
    connections.splice(position, 1); // and delete it from the array
  });
}

// This function broadcasts messages to all webSocket clients
function broadcast(data) {
    for (myConnection in connections) {   // iterate over the array of connections
      connections[myConnection].send(data); // send the data to each connection
    }
  }
