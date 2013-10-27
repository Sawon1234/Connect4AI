function connect4(s, wb, hb, r) {
  this.s = s;
  this.widthblock = wb;
  this.heightblock = hb;
  this.r = r;
  this.colorA = "#F5E50A"
  this.colorB = "#FD0A06";
  this.turn = 0;
  drawConnect4Board(this);
  

  function drawConnect4Board(connect4) {
    var circlescale = 0.8;
    var widthpix = connect4.widthblock  * 2 * connect4.r;
    var heightpix = connect4.heightblock * 2 * connect4.r;
    var radius = connect4.r * circlescale;

    var board = s.group();

    board.add(s.rect(0,0,widthpix, heightpix));
    board.attr({
      fill: "#bada55"
    })
    var circles = s.group();
    for (var i = 1; i <= connect4.widthblock; i++) {
      for (var j = 1; j <= connect4.heightblock; j++) {
        var xoffset = (i - 0.5) * (widthpix / connect4.widthblock) + (circlescale/2);
        var yoffset = (j - 0.5)*(heightpix/ connect4.heightblock) + (circlescale/2);
        var circle = s.circle(xoffset, yoffset, radius);
        circle.click((function(a, b, c) {
          return function() {
            clickAction(a, b, c);
          }
        })(i,j, connect4));
        circles.add(circle);
      }
    }
    circles.attr({
      fill: "#fff"
    });
    board.add(circles);
    board.drag();

    connect4.circlescale = circlescale;
    connect4.widthpix = widthpix;
    connect4.heightpix = heightpix;
    connect4.radius = radius;
    connect4.board = board;
    connect4.base = Array.apply(null, new Array(connect4.widthblock)).map(Number.prototype.valueOf, connect4.heightblock);
  }

  function clickAction(x, y, context) {
    var xoffset = (x - 0.5) * (context.widthpix / context.widthblock) + (context.circlescale/2);
    var yinit = 0;
    var yfinal = (context.base[x-1] - 0.5) * (context.heightpix / context.heightblock) + (context.circlescale/2);
    context.base[x-1] --;
    var c = s.circle(xoffset, 0, context.radius);
    var fillcolor = context.turn % 2 == 0? context.colorA : context.colorB;
    context.turn++;
    c.attr({
      fill: fillcolor
    });
    c.click((function(a, b, c) {
      return function() {
        clickAction(a, b, c);
      }
    })(x, y, context));
    context.board.add(c);
    c.animate({cy : yfinal}, 1000, mina.bounce);
  }
}

$(document).ready(function() {
  var s = Snap($(document).width(), $(document).height());
  new connect4(s, 7, 6, 30);
});
