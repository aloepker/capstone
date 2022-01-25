let text;       // variable for the text div
let socket = new WebSocket("ws://localhost:8081");
 
function setup() {
      // The socket connection needs two event listeners:
  socket.onopen = openSocket;
  socket.onmessage = showData;
 
  // make a new div and position it at 10, 10:
  text = createDiv("Sensor reading:");
  text.position(10,10);
}
 
function draw() {

}

function openSocket() {
    text.html("Socket open");
    socket.send("Hello server");
  }
   
  function showData(result) {                    //edit for onscreen data
    // result is a JSON string. Parse it:
    let input = JSON.parse(result.data);
    // when the server returns, show the result in the div:
    text.html("Sensor reading:" + input);
    xPos = int(input);        // convert result to an integer
    text.position(xPos, 10);        // position the text
  }