var serialport = require("serialport");

console.log("Starting Arduino Data");

var port = new serialport('/dev/ttyUSB0',{
//arduino needs to be connected to the correct port, USB0
baudRate:9600,
//parser:serialport.parsers.readline('/n')
});
const Readline=serialport.parsers.Readline;
const parser=new Readline();
port.pipe(parser);

port.on('open', onPortOpen);
parser.on('data', onData);
port.on('close',onClose);
port.on('error',onError);
port.write('Hi Mom');

function onPortOpen(){
console.log("waiting for data");
}

function onData(data){
console.log("data received: "+data);   //so instead of console.log, I can return the data varriable. 
}                                      //it is then a new mutable variable to be updated to a page or database
function onClose(){
console.log("serialport closed");
}
function onError(){
console.log("serial communication error");
}
