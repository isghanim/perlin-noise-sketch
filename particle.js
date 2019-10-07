let diameter = 250;
let radius = diameter / 2;

function Particle(initialX = 0, initialY = 0, color) {
    this.pos = createVector(initialX, initialY);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 1;
    this.color = color;

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.follow = function(vectors) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.show = function() {
        stroke(0, 160);
        fill(this.color);
        circle(this.pos.x, this.pos.y, diameter);
    }
 
    this.edges = function() {
        if (this.pos.x > width + radius) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0 - radius) {
            this.pos.x = width + radius;
        }
        if (this.pos.y > width + radius) {
            this.pos.y = 0;
        }
        if (this.pos.y < 0 - radius) {
            this.pos.y = width;
        }
    }
}