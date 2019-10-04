let paused = false;
var inc = 0.05;
var scl = 10;
var cols, rows;
var zoff = 0;

var particles = [];

var flowfield;

function setup() {
  createCanvas(displayWidth, displayHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  background(0);

  flowfield = new Array(cols * rows);

  var c = color(0, 0, 255, 5);
  initParticles(c);
}

function initParticles(c) {
  for (let i = 0; i < 20; i++) {
    particles[i] = new Particle(random(width), random(height), c);
  }
}

function mousePressed() {
  paused = !paused;
}

function keyPressed() {
  initParticles(color(0, 0, 255, 5));
}

function draw() {
  if (!paused) {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        var index = x + y * cols;
        var angle = noise(xoff, yoff, zoff) * TWO_PI;
        var boop = noise(xoff, yoff, zoff) * 255;
        var v = p5.Vector.fromAngle(angle);
        v.setMag(5);
        flowfield[index] = v;
        xoff += inc;

        background(boop, 0, boop, boop)
      }
      yoff += inc;
    }

    zoff += inc;

    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }
  }

}
