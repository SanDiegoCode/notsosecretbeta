var anchor = {
  create: function(c, startPoint) {
    var ac = Object.create(this);
        ac.canvas = c;
        ac._x = (startPoint) ? startPoint.x : ac.canvas.width / 2;
        ac._y = (startPoint) ? startPoint.y : ac.canvas.height / 2;
        return ac;
  },
  canvas: null,
  _x: (this.canvas) ? this.canvas.width / 2 : 0,
  _y: (this.canvas) ? this.canvas.height / 2 : 0,
  _rad: 30,
  _startAngle: 0,
  _iterations: 100,
  _maxAngle: Math.PI * 2,
  _lastPoint: {
    x: this._x,
    y: this._y,
  },
  getIterations: function() {
    var iterations = [];
    for(var i = 0; i <= this._iterations; i++) {
      const angle = this._maxAngle / this._iterations * i + this._startAngle;
      const x = this._x + Math.cos(angle) * this._rad;
      const y = this._y + Math.sin(angle) * this._rad;
      iterations.push({
        x,
        y,
      });
    }
    return iterations;
  },

  getLineAnchor: function(random) {
    if(random) {
      return (Math.random() < 0.5) ? {
        x: this._x,
        y: this._y
      } : {
        x: this._lastPoint.x,
        y: this._lastPoint.y
      };
    }
    return {
      x: this._x,
      y: this._y
    };
  },

  setLastPoint(point) {
    this._lastPoint = point;
  },

  setAngleBound(bound) {
    this._maxAngle = bound;
  },

  setStartAngle(angle) {
    this._startAngle = angle;
  },

  reAnchor: function(x, y) {
    this._x = x;
    this._y = y;
  }
};
