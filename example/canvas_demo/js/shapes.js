function Square (matrix, maxRows, maxCols, ctx, style) {
  this.ctx = ctx;
  this.boardHeight = maxRows || 1;
  this.boardWidth = maxCols || 1;
  this.w = parseInt ((this.ctx.canvas.width / this.boardWidth ));
  this.h = parseInt ((this.ctx.canvas.height / this.boardHeight ));
  this.side = 4;
  this.matrix = (matrix.length === this.getBoadDimension() * this.side) ? matrix : Array_1D(1, maxRows * maxCols * this.side);
  this.style = style;
  this.sideLength = this.w ;
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


function Points (matrix, maxRows, maxCols, nodes, ctx, style) {
  this.ctx = ctx;
  this.boardHeight = maxRows || 1;
  this.boardWidth = maxCols || 1;
  this.w = parseInt ((this.ctx.canvas.width / this.boardWidth ));
  this.h = parseInt ((this.ctx.canvas.height / this.boardHeight ));
  this.side = nodes || 0;
  this.angle = (Math.PI) / 2;
  this.matrix = (matrix.length === this.getBoadDimension() * this.side) ? matrix : Array_1D(1, maxRows * maxCols * this.side);
  this.style = style;
  this.sideLength = this.w/2;
  this.radius = 2;
  this.grid = {'vertices' : [], 'centroid': [], 'sideLength':this.sideLength};
  this.dotArr = [];
  this.stepsVert = [];
}
Points.prototype.getMatrix = function () {
  return this.matrix;
}
Points.prototype.getGrid = function () {
  return this.grid;
}
Points.prototype.setGrid = function (vert, centroid) {
  this.grid.vertices.push(vert);
  this.grid.centroid.push(centroid);
}
Points.prototype.getSide = function () {
  return this.side;
}
Points.prototype.getBoadDimension = function () {
  return this.boardHeight * this.boardWidth;
}
Points.prototype.drawBoard = function () {
  for (let i = 0, cnt = 0; i < this.boardHeight; i++) {
    for (let j = 0; j < this.boardWidth; j++,cnt++) {
      let x = j * this.w + this.w/2 +Math.cos(i*j)*10;
      let y = i * this.h + this.h/2 +Math.sin(i*j)*10;
      this.drawPoints (x, y, cnt, j, i);
    }
  }
  this.connectDots();
  return  this.stepsVert;
}

Points.prototype.drawShape = function (x, y) {
  this.ctx.beginPath();
  this.ctx.arc (x, y, 1 , 0, 2 * Math.PI, false);
  this.ctx.fillStyle = "white";
  this.ctx.fill();
}

Points.prototype.drawPoints = function (x, y, idx, cx, cy) {
  
  let mx = this.matrix.slice(this.side*idx, (this.side*idx)+this.side);
  this.ctx.beginPath();
  this.ctx.arc (x, y, this.radius, 0, 2 * Math.PI, false);
  this.ctx.fillStyle = "blue";
  this.ctx.fill();
  var steps = [];
  for (let j = 0; j<this.side; j++){
    var tempSteps = [];
    if(!mx[j]){

      let a = j * this.angle - this.angle;
      let tx = x - Math.cos(cx*cy)*10;
      let ty = y - Math.sin(cx*cy)*10;
      let rx = tx + this.w * Math.cos(a);
      let ry = ty + this.h * Math.sin(a);
      let dy = (ry - ty);
      let dx = (rx - tx);
      let kx =  cx + Math.sign(dx);
      let ky =  cy + Math.sign(dy);
      rx = rx + Math.cos(kx*ky)*10;
      ry = ry + Math.sin(kx*ky)*10;

      for (let i = 0; i < 1; i+=0.6) {
        let newx = quadraticBezier (x, x  , rx, i);
        let newy = quadraticBezier (y, y , ry, i);
        tempSteps.push([newx, newy]);
      }
    }
    steps.push(tempSteps);
  }
  this.stepsVert.push([x, y]);
  this.dotArr.push({'pos':[x, y],'nodes':mx,'steps':steps});

}

Points.prototype.connectDots = function () {
  if (!this.dotArr.length){
      console.log("DOne");
      return;
  }
  var coord = this.dotArr.shift();
  var pos =coord['pos'];
  var mx =coord['nodes'];
  var steps = coord['steps'];

  this.drawDots(pos, steps);
  
}

Points.prototype.drawDots = function (pos, steps) {
  var self = this;

  if (steps.length){
    var s = steps.shift();
    this.drawPath(s);
    return this.drawDots(pos, steps);
  } else {
    return this.connectDots();
  }
}

Points.prototype.drawPath = function (s) {
  var self = this;
  if (s.length){
      
      this.ctx.save();
      let coord = s.shift();
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = "black";
      this.ctx.globalAlpha = 0.5;
      this.drawShape(coord[0], coord[1]);
      this.ctx.restore();
      
    render(function () {
          self.drawPath(s);
          
    }); 
  }
}
Points.prototype.rotateAtPoint = function(angle, pt1) {
  this.ctx.translate (pt1[0], pt1[1]);
  this.ctx.rotate(angle);
  this.ctx.translate (-pt1[0], -pt1[1]);
};

Points.prototype.translate = function(x, y) {
  this.ctx.translate(x,y);
};




/*
Vehicle
 */
function Vehicle(ctx, start, end,  vert) {
  this.ctx = ctx;
  this.vert = vert;
  this.p1 = vert[start];
  this.x = this.p1[0];
  this.y = this.p1[1];
  this.w = 10;
  this.h = 2;
  this.pathCoord = []; 
  this.clearShape (this.x, this.y);
  this.mark(start, end);
}

Vehicle.prototype.mark = function (start, end) {
  var s = this.vert[start];
  var e = this.vert[end];
  this.ctx.globalAlpha = 0.3;
  this.ctx.globalCompositeOperation = "lighter";
  this.ctx.beginPath();
  this.ctx.arc (s[0], s[1], 10 , 0, 2 * Math.PI, false);
  this.ctx.arc (e[0], e[1], 10 , 0, 2 * Math.PI, false);
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.globalCompositeOperation = "source-over";
  this.ctx.globalAlpha = 1;
}
Vehicle.prototype.clearShape = function (x, y, fillColor, strokeColor) {
  this.ctx.beginPath();
  this.ctx.arc (x, y, 0.3 + Math.random() , 0, 2 * Math.PI, false);
  this.ctx.fillStyle = fillColor;
  this.ctx.fill();
  this.ctx.globalAlpha = 1;
}

Vehicle.prototype.run = function (path) {
  if (!path.length) {
    this.drawPath (this.pathCoord.shift());
    return;
  }
  var self = this;
  let idx = path.shift();  
  let p2 = this.vert[idx]; 
  
 var newx = 0, 
     newy = 0;
 
  //var angle = vectorAngleTan2(normalizeVector ([this.p1[0] + this.w, this.p1[1] + this.h]), normalizeVector(p2));
  var angle = vectorAngleTan2( normalizeVector([p2[0] - this.p1[0], p2[1] - this.p1[1]]));


  for (let i = 0; i < 1; i+=0.1) {
    newx = lerp(this.p1[0], p2[0], i),
    newy = lerp(this.p1[1], p2[1], i);

    this.pathCoord.push({'x':newx, 'y':newy, 'rotate': angle});

  }
  
  this.p1 = p2;
  this.run(path);
}

Vehicle.prototype.drawPath = function (prev) {
    if (!this.pathCoord.length){
      //this.clearShape (prev.x , prev.y , "white","white");
      return;
    }
    let self = this;
    let curr = this.pathCoord.shift();
 
    render(function () {
           setTimeout(function(){
              ctx.save();
              this.ctx.shadowBlur = 10;
              this.ctx.shadowColor = "white";
              this.ctx.globalCompositeOperation = "luminosity";
              self.clearShape (prev.x , prev.y , "white","white");

              ctx.restore();
           }, 100);
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



