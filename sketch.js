let paused = false;
var inc = 0.01;
var scl = 5;
var cols, rows;
var zoff = 0.001;

var particles = [];

var flowfield;

function setup() {
  createCanvas(displayWidth, displayHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  setBackground();

  flowfield = new Array(cols * rows);

  initParticles();
}

function initParticles() {
  for (let i = 0; i < 20; i++) {
    // color(100, 0, 255, 5)
    particles[i] = new Particle(
      random(width),
      random(height),
      random(10, 250),
      color(random(80, 140), 0, random(100, 200), 5),
      color(random(50, 100), 0, 70, 160)
    );
  }
}

// color(random(80, 140), 0, random(100, 200), 5),
// color(random(50, 100), 0, 70, 160)

// color(random(80, 140), 0, random(80, 140), 5),
// color(random(50, 100), 0, 70, 160)

// color(random(80, 120), 0, random(100, 200), 5),
// color(random(50, 80), 0, random(80, 150), 160)

function setBackground() {
  background(100, 0, 70);
  // background(70, 0, 130);
  // background(0);
}

function mousePressed() {
  paused = !paused;
}

function keyPressed() {
  clear();
  setBackground();
  particles = [];
  initParticles();
}

function draw() {
  if (!paused) {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        var index = x + y * cols;
        var angle = noise(xoff, yoff, zoff) * TWO_PI;
        var v = p5.Vector.fromAngle(angle);
        v.setMag(0.001);
        flowfield[index] = v;
        xoff += inc;
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
