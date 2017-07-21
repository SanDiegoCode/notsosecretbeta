var utils = {
	randomColor: function(a) {
		var r = Math.floor(Math.random() * 256) + 1,
			g = Math.floor(Math.random() * 256) + 1,
			b = Math.floor(Math.random() * 256) + 1;
		return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
	},

  invertColor: function(clr) {
    return "white";
  },

	distanceTo: function(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	},

  populate: function(arr, num, fn, args) {
    var newArr = [];
    for(var i = 0; i < num; i++) {
      newArr.push(fn(args));
    }
    return newArr;
  },

  drawCircle: function(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  },

  randNum: function(l) {
    return Math.floor(Math.random() * l);
  }
};
