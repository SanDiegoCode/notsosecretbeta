var canvas = document.createElement("canvas");
    canvas.setAttribute("class", "bottomCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

document.body.appendChild(canvas);

var title = document.createElement("div");
    title.setAttribute("class", "title");
    title.innerHTML = "San Diego Coding";

document.body.appendChild(title);

var ctx = canvas.getContext("2d");

var canvas2 = document.createElement("canvas");
    canvas2.setAttribute("class", "topCanvas");
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

document.body.appendChild(canvas2);

var crx = canvas2.getContext("2d");

const crxColor = "rgba(0, 0, 0, 0.4)"
const ctxColor = utils.randomColor(0.01);

crx.fillStyle = crxColor;

ctx.strokeStyle = ctxColor;
ctx.lineWidth = 1;

title.style.color = utils.invertColor(ctxColor);

var physicsWorld = new world(1);

var anchors = [];

anchors = utils.populate(anchors, 100, function() {
  return anchor.create(canvas, {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  });
});

var blobs = [];

blobs = utils.populate(blobs, 20, function() {
  return new blob(utils.randNum(canvas2.width), utils.randNum(canvas2.height), vector.create(0, 1));
});


update();


function update() {
  pubsub.publish("update", 1);
  crx.clearRect(0, 0, canvas2.width, canvas2.height);
  anchors.map(function(anch) {
    var iterations = anch.getIterations();
    iterations.map(function(i) {
      const lineAnchor = anch.getLineAnchor(true);

      ctx.beginPath();
      ctx.moveTo(lineAnchor.x, lineAnchor.y);
      ctx.lineTo(i.x, i.y);
      ctx.stroke();
      ctx.closePath();

      anch.setLastPoint({
        x: i.x,
        y: i.y
      });
    });
    var newAnch = iterations[Math.floor(Math.random() * iterations.length)];
    anch.reAnchor(newAnch.x, newAnch.y);
  });

  blobs.map(function(b) {
    b.draw(canvas2, crx);
  });

  physicsWorld.getParticles().map(function(p) {
    utils.drawCircle(crx, p.getX(), p.getY(), p.getMass());
  });

  requestAnimationFrame(update);
}
