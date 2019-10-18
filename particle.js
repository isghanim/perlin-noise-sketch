function Particle(initialX = 0, initialY = 0, diameter = 250, fillColor = color(100, 0, 255, 5), strokeColor = color(100, 0, 70, 160)) {
    this.pos = createVector(initialX, initialY);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 0.3;
    this.diameter = diameter;
    this.radius = diameter / 2;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;

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
        stroke(this.strokeColor);
        fill(this.fillColor);
        circle(this.pos.x, this.pos.y, this.diameter);
    }
 
    this.edges = function() {
        if (this.pos.x > width + this.radius) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0 - this.radius) {
            this.pos.x = width;
        }
        if (this.pos.y > width + this.radius) {
            this.pos.y = 0;
        }
        if (this.pos.y < 0 - this.radius) {
            this.pos.y = width;
        }
    }
}