let socket;
let hue;

function drawData(data) {
  fill(color(`hsb(${data.hue}, 100%, 50%)`));
  circle(data.x, data.y, 20);
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(20);
  noStroke();

  socket = io.connect();
  socket.on("mouse", drawData);
  hue = ~~random(360);
}

function mouseDragged() {
  const data = { x: mouseX, y: mouseY, hue };

  drawData(data);
  socket.emit("mouse", data);
}
