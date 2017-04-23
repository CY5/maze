function Square (matrix, maxRows, maxCols, ctx, style) {
  this.ctx = ctx;
  this.boardHeight = maxRows || 1;
  this.boardWidth = maxCols || 1;
  this.w = parseInt ((this.ctx.canvas.width / this.boardWidth ));
  this.h = parseInt ((this.ctx.canvas.height / this.boardHeight ));
  this.side = 4;
  this.matrix = (matrix.length === this.getBoadDimension() * this.side) ? matrix : Array_1D(1, maxRows * maxCols * this.side);
  this.style = style;
  this.sideLength = this.w / 2 ;
  this.grid = {'vertices' : [], 'centroid': [], 'sideLength':this.sideLength};
}
Square.prototype.getMatrix = function () {
  return this.matrix;
}
Square.prototype.getGrid = function () {
  return this.grid;
}
Square.prototype.setGrid = function (vert, centroid) {
  this.grid.vertices.push(vert);
  this.grid.centroid.push(centroid);
}
Square.prototype.getSide = function () {
  return this.side;
}
Square.prototype.getBoadDimension = function () {
  return this.boardHeight * this.boardWidth;
}
Square.prototype.drawBoard = function () {
  for (let i = 0, cnt = 0; i < this.boardHeight; i++) {
    for (let j = 0; j < this.boardWidth; j++,cnt++) {
      this.drawSquare (j * this.w, i * this.h, cnt);
    }
  }
}
Square.prototype.drawSquare = function(x, y, idx) {
  let mx = this.matrix.slice(this.side*idx, (this.side*idx)+this.side);

  this.move_line (mx[0], x, y, x + this.w, y);
  this.move_line (mx[1], x + this.w, y, x + this.w, y + this.h);
  this.move_line (mx[2], x + this.w, y + this.h,x, y + this.h);
  this.move_line (mx[3], x, y + this.h,x, y);

  let vert = [[x, y],[x + this.w, y],[x + this.w, y + this.h],[x, y + this.h]];
  let centroid = centroidPoly (vert, true);

  this.setGrid(vert, centroid);
};

Square.prototype.move_line = function (flag, x1, y1, x2, y2) {
  if(flag){
    this.ctx.strokeStyle = this.style.stroke;
    this.ctx.lineWidth = this.style.lineWidth;
    this.ctx.fillStyle = this.style.fill;
  }else{
    this.ctx.strokeStyle = this.style.erase;
    this.ctx.lineWidth = this.style.lineWidth;
    this.ctx.fillStyle = this.style.fill;
  }
  this.ctx.beginPath();
  this.ctx.moveTo(x1, y1);
  this.ctx.lineTo(x2 , y2);
  this.ctx.closePath();
  this.ctx.fill();
  this.ctx.stroke(); 
}



function Hexagon(matrix, maxRows, maxCols, ctx, style){
  this.ctx = ctx;
  this.hexagonAngle = 0.523598776; // 30 degrees in radians

  this.boardWidth = maxRows;
  this.boardHeight = maxCols;

  this.side = 6;
  if(this.ctx.canvas.height > this.ctx.canvas.width){
    this.D = Math.floor ((3.5 * this.ctx.canvas.width)/(3*this.boardWidth + 1));
  }else{
    this.D = Math.floor ((4 * this.ctx.canvas.height)/(3*this.boardWidth + 3));
  }
  this.sideLength  =  this.D / 2;
  this.R = this.sideLength;
  this.r = Math.floor(Math.cos(this.hexagonAngle) * this.R);
  this.d = Math.floor((Math.sqrt(3) * this.D) / 2);
  this.matrix = (matrix.length === this.getBoadDimension() * this.side) ? matrix : Array_1D(1, maxRows * maxCols * this.side);
  this.style = style;
  this.grid = {'vertices' : [], 'centroid': [], 'sideLength':this.sideLength};
}
Hexagon.prototype.getGrid = function () {
  return this.grid;
}
Hexagon.prototype.setGrid = function (vert, centroid) {
  this.grid.vertices.push(vert);
  this.grid.centroid.push(centroid);
}
Hexagon.prototype.getBoadDimension = function () {
  return this.boardHeight * this.boardWidth;
}
Hexagon.prototype.drawBoard = function() {

  for(var j = 0, cnt = 0; j < this.boardWidth; ++j) {
    for(var i = 0; i < this.boardHeight; ++i, cnt++) {
      this.drawHexagon(
        i * this.d + ((j % 2) * this.r),
        j * (this.R + Math.floor(this.R/2)),
        cnt
        );
    }
  }
}

Hexagon.prototype.getSide = function () {
  return this.side;
}
Hexagon.prototype.drawHexagon = function(x, y, idx) {
  let mx = this.matrix.slice(this.side*idx, (this.side*idx)+this.side);
  this.move_line(mx[0], x + this.r, y, x + this.d, y + Math.floor(this.R / 2));
  this.move_line(mx[1], x + this.d, y + Math.floor(this.R / 2), x + this.d, y + this.R + Math.floor(this.R/2));
  this.move_line(mx[2], x + this.d, y + this.R + Math.floor(this.R/2), x + this.r, y + this.D);
  this.move_line(mx[3], x + this.r, y + this.D, x, y + this.R + Math.floor(this.R/2));
  this.move_line(mx[4], x, y + this.R + Math.floor(this.R/2), x, y + Math.floor(this.R/2));
  this.move_line(mx[5], x, y + Math.floor(this.R/2), x + this.r, y);

  let vert = [[x + this.r, y],[x + this.d, y + Math.floor(this.R / 2)],[x + this.d, y + this.R + Math.floor(this.R/2)],[x + this.r, y + this.D],[x, y + this.R + Math.floor(this.R/2)],[x, y + Math.floor(this.R/2)]];

  let centroid = centroidPoly (vert, true);
  this.setGrid(vert, centroid);
}

Hexagon.prototype.move_line = function (flag, x1, y1, x2, y2) {
  if(flag){
    this.ctx.strokeStyle = this.style.stroke;
    this.ctx.lineWidth = this.style.lineWidth;
    this.ctx.fillStyle = this.style.fill;
  }else{
    this.ctx.strokeStyle = this.style.erase;
    this.ctx.lineWidth = this.style.lineWidth;
    this.ctx.fillStyle = this.style.fill;
  }
  this.ctx.beginPath();
  this.ctx.moveTo(x1, y1);
  this.ctx.lineTo(x2 , y2);
  this.ctx.closePath();
  this.ctx.fill();
  this.ctx.stroke(); 
}

function Vehicle(ctx, start, end,  grid, color, trail) {
  this.ctx = ctx;
  this.w = grid.sideLength / 2 ;
  this.h = grid.sideLength / 4 ;
  this.vert = grid.vertices;
  this.centroid = grid.centroid;
  this.p1 = this.centroid[start];
  this.x = this.p1[0] - (this.w / 2);
  this.y = this.p1[1] - (this.h / 2);
  this.err = this.w * 0.1;
  this.tp = this.centroid[end];
  this.mark([this.x, this.y], "#e91e63");
  this.mark([this.tp[0] - (this.w / 2), this.tp[1] - (this.h / 2)],"#8bc34a");
  //this.drawShape(this.x, this.y, "rgba(0, 150, 136,1)", "white");
  this.pathCoord = []; 
  this.color = color || "rgba(0, 150, 136,1)";
  this.trail = trail;
}
Vehicle.prototype.mark = function (coord,fillColor){
  
  this.ctx.strokeStyle = fillColor;
  this.ctx.fillStyle  = fillColor;
  let topX = coord[0] - this.w;
  let topY = coord[1] - this.h;
  let gX = (coord[0] - topX) * 0.2;
  let gY = (coord[1] - topY) * 0.8;
  this.ctx.fillRect(coord[0] - gX, coord[1] - gY, this.w, this.h);
  this.ctx.stroke();
}
Vehicle.prototype.drawShape = function (x, y, fillColor, strokeColor) {
  this.ctx.strokeStyle = strokeColor;
  this.ctx.fillStyle  = fillColor;
  this.ctx.fillRect(x, y, this.w, this.h);
  this.ctx.stroke();
}
Vehicle.prototype.clearShape = function (x, y, fillColor, strokeColor) {
  this.ctx.strokeStyle = strokeColor;
  this.ctx.fillStyle  = fillColor;
  this.ctx.fillRect(x - this.err, y  - this.err, this.w  + 2*this.err, this.h + 2*this.err);
  this.ctx.stroke();
}

Vehicle.prototype.run = function (path) {
  if (!path.length) {
    this.drawPath (this.pathCoord.shift());
    return;
  }
  var self = this;
  let idx = path.shift();  
  let p2 = this.centroid[idx]; 
  
 var newx = 0, 
     newy = 0;
 
  //var angle = vectorAngleTan2(normalizeVector ([this.p1[0] + this.w, this.p1[1] + this.h]), normalizeVector(p2));
  var angle = vectorAngleTan2( normalizeVector([p2[0] - this.p1[0], p2[1] - this.p1[1]]));


  for (let i = 0; i < 1; i+=0.08) {
    newx = lerp(this.p1[0], p2[0], i) - (this.w / 2),
    newy = lerp(this.p1[1], p2[1], i) - (this.h / 2);

    this.pathCoord.push({'x':newx, 'y':newy, 'rotate': angle});

  }
  
  this.p1 = p2;
  this.run(path);
}

Vehicle.prototype.drawPath = function (prev) {
    if (!this.pathCoord.length){
      
      return;
    }
    let self = this;
    let curr = this.pathCoord.shift();
    this.ctx.save();
    this.rotateCenter (prev.rotate, [prev.x, prev.y]);
    this.clearShape (prev.x , prev.y , this.trail,"red");
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.rotateCenter (curr.rotate, [curr.x, curr.y]);
    this.drawShape (curr.x , curr.y , this.color, "white");
    this.ctx.restore();
    render(function () {
           self.drawPath(curr);
    });
}
Vehicle.prototype.rotateCenter = function(angle, pt1) {
  var mid = midpoint (pt1, [pt1[0]+ this.w, pt1[1]+ this.h]);
  this.ctx.translate (mid[0], mid[1]);
  this.ctx.rotate(angle);
  this.ctx.translate (-mid[0], -mid[1]);
};

Vehicle.prototype.translate = function(x, y) {
  this.ctx.translate(x,y);
};

