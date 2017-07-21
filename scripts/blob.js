var blob = function(x, y, vect) {
  this.points = [];
  this.pointRadius = 1;
  this.force = vect;
  this.radius = 30;
  var dir = (Math.random() < 0.5) ? Math.PI * Math.random() : -Math.PI * Math.random();
  this.particle = _particle.create(x, y, 2, dir, 0.98);
  //this.particle.addGravitation(middle);
  this.particle.mass = 200 * Math.random() + 100;

  this.elasticity = 0.05;

  this.numPoints = 16;

  for(var i = 0; i < this.numPoints; i++) {
    var p1 = _particle.create( this.particle.x + Math.cos(Math.PI * 2 / this.numPoints * i), this.particle.y + Math.sin(Math.PI * 2 / this.numPoints * i), 0, 0, 0.80);
    this.points.push(p1);
  }


  for(var i = 0; i < this.points.length; i++) {
    this.points[i].addSpring(this.particle, this.elasticity, this.radius);
  }

  for(var i = 1; i < this.points.length; i++) {
    this.points[i].addSpring(this.points[i-1], this.elasticity, this.radius / 2 * Math.random());
    this.points[i-1].addSpring(this.points[i], this.elasticity, this.radius / 2 * Math.random());
  }

  for(var i = this.points.length - 1; i >= this.points.length / 2; i--) {
    var index = i - this.points.length / 2;
    this.points[i].addSpring(this.points[index], this.elasticity, this.radius * 2);
    this.points[index].addSpring(this.points[i], this.elasticity, this.radius * 2);
  }


  this.points[this.points.length - 1].addSpring(this.points[0], this.elasticity, this.radius / 2);

  this.draw = function(canvas, ctx) {
    if(this.particle.x + this.radius >= canvas.width) {
      var h = this.particle.getHeading();
      this.particle.x = canvas.width - this.radius;
      var lx = this.force.getX(),
        ly = this.force.getY();
        this.particle.setSpeed(this.particle.getSpeed() * 0.4);
      this.force = vector.create(-1 * lx, ly);
    }
    if(this.particle.x - this.radius <= 0) {
      var h = this.particle.getHeading();
      this.particle.x = 0 + this.radius;
      var lx = this.force.getX(),
        ly = this.force.getY();
        this.particle.setSpeed(this.particle.getSpeed() * 0.4);
      this.force = vector.create(-1 * lx, ly);
    }
    if(this.particle.y + this.radius >= canvas.height) {
      var h = this.particle.getHeading();
      this.particle.y = canvas.height - this.radius;
      var lx = this.force.getX(),
        ly = this.force.getY();
        this.particle.setSpeed(this.particle.getSpeed() * 0.4);
      this.force = vector.create(lx, -1 * ly);
    }
    if(this.particle.y - this.radius <= 0) {
      var h = this.particle.getHeading();
      this.particle.y = 0 + this.radius;
      var lx = this.force.getX(),
        ly = this.force.getY();
      this.particle.setSpeed(this.particle.getSpeed() * 0.4);
      this.force = vector.create(lx, -1 * ly);
    }

    for(var w = 0; w < blobs.length; w++) {
      if(blobs[w] != this) {
        this.particle.gravitateTo(blobs[w].particle);
      }
    }



    //this.particle.accelerate(this.force.getX(), this.force.getY());
    this.particle.update();
    /*for(var i = 0; i < this.points.length; i++) {
      this.points[i].accelerate(this.force.getX(), this.force.getY());
    }*/
    var rval = Math.floor(255 - (this.particle.mass / 300 * 255));
    ctx.fillStyle = "rgba(" + rval + ", 0, 0, 1)";
    ctx.strokeStyle = "rgba(" + rval + ", 0, 0, 1)";
    for(var i = 0; i < this.points.length; i++) {
      this.points[i].update();
      ctx.beginPath();
      ctx.arc(this.points[i].x, this.points[i].y, this.pointRadius, 0, Math.PI * 2);
      ctx.fill();

        for(var k = 0; k < this.points[i].springs.length; k++) {
          ctx.moveTo(this.points[i].x, this.points[i].y);
          ctx.lineTo(this.points[i].springs[k].point.x, this.points[i].springs[k].point.y);
          ctx.stroke();
        }

      ctx.closePath();
    }

    /*ctx.beginPath();
    ctx.arc(this.particle.x, this.particle.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.arc(this.particle.x, this.particle.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.closePath();*/
  };
};
