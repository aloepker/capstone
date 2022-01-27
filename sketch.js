let text;       // variable for the text div
let socket = new WebSocket("ws://localhost:8081");
 
function setup() {
      // The socket connection needs two event listeners:
  socket.onopen = openSocket;
  socket.onmessage = showData;
 
  // make a new div and position it at 10, 10:    / creation of new div is first part of determining where data will show
  text = createDiv("text here");
  text.position(10,10);
}
 
function draw() {

}

function openSocket() {
    text.html("Socket open");
   // socket.send("Hello server");
  }
   
  function showData(result) {                    //edit for onscreen data , probably called in p5.js it seems
    // result is a JSON string. Parse it:
    let input = result.data;//let input = JSON.parse(result.data);
    // when the server returns, show the result in the div:
    text.html("Arduino reading:" + input);

    document.getElementById("two").innerHTML = "arduino temp: "+input; // this attempt now works!!!!!!
    //datap.html(input); // should add the sensor output to the new datap p html attribute, yet didnot work....
   
   
    // xPos = int(input);        // convert result to an integer
   // text.position(xPos, 10);        // position the text
  }