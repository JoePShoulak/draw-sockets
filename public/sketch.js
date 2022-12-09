let socket;

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  background(20);
}

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
}

function mouseDragged() {
  const hue =
    socket.id.split("").reduce((acc, val) => acc + val.charCodeAt(0), 0) % 360;
  fill(color(`hsb(${hue}, 100%, 50%)`));
  const data = { x: mouseX, y: mouseY, hue };
  circle(data.x, data.y, 20);
  socket.emit("mouse", data);
}

function draw() {}
