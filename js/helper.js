function resize(gl) {
  var realToCSSPixels = window.devicePixelRatio;

  // Lookup the size the browser is displaying the canvas in CSS pixels
  // and compute a size needed to make our drawingbuffer match it in
  // device pixels.
  var displayWidth  = Math.floor(gl.canvas.clientWidth  * realToCSSPixels);
  var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);

  // Check if the canvas is not the same size.
  if (gl.canvas.width  !== displayWidth ||
      gl.canvas.height !== displayHeight) {

    // Make the canvas the same size
    gl.canvas.width  = displayWidth;
    gl.canvas.height = displayHeight;
  }
}

/**
 * Initialize 1 Dimensional array of length size and filled with specified Number
 * @param  {no}
 * @param  {size}
 * @return {array}
 */
 function Array_1D(no, size){
 	var arr = Array.apply(null, Array(size));
 	return arr.map(function (x, i) { return no });
 }
 /**
 * Initialize 2 Dimensional array of length size and filled with specified Number
 * @param  {no}
 * @param  {size}
 * @return {array}
 */
 function Array_2D(no, row, col) {
     var arr = Array.apply(null, Array(row)).map(function() {
         return Array.apply(null, Array(col));
     });
     return arr.map(function(x, i) {
	    return x.map(function(y, j) {
	        return JSON.parse(JSON.stringify(no));
	    });
	});
 }
/**
 * Returns Random Int Number Between a Range of Number
 * @param  {Min}
 * @param  {Max}
 * @return {Random No}
 */
 function getRandomInt(min, max) {
 	return Math.floor(Math.random() * (max - min + 1)) + min;
 }

/**
 * toggle the value
 * @param  {val}
 * @return {1 or 0}
 */
 function toogle(val){
 	return (val == 0 ? 1 : 0);
 }

function inside(cell, maxRows, maxCol){
	if((cell[0] >= 0 && cell[0] <= maxRows-1)
		&& (cell[1] >= 0 && cell[1] <= maxCol-1)){
		return true;
	}
	return false;
}
function nonVisited(neighbour, makeArray) {
	return neighbour.filter(function(x, i){
	     return !makeArray[x[0]][x[1]] ;
	});
}

function getSharedWall(pcell,ccell){
	if(pcell[0] > ccell[0]){
		//"Top"
    return [1, 0, 0, 0];
	}else if(pcell[0] < ccell[0]){
	 //"Bottom"
   return [0, 0, 1, 0];
	}else if(pcell[1] > ccell[1]){
	 //"Left"
   return [0, 0, 0, 1];
	}else if(pcell[1] < ccell[1]){
	 //"Right"
   return [0, 1, 0, 0];
	}
}
function getAdjacentCell(cell, maxRows, maxCol){
	var neighbour = getBounds(cell);
	return neighbour.filter(function(x, i){
	   return inside(x, maxRows, maxCol);
	});
}
function getBounds(cell){
	return [
			[cell[0]-1, cell[1]],
			[cell[0], cell[1]+1],
			[cell[0]+1, cell[1]],
			[cell[0], cell[1]-1],
			];
}

function drawGrid(ctx, size, steps,strokeColor){
	ctx.lineWidth = 2;
	ctx.beginPath();
	drawRow(ctx, size, steps);
	drawColumn(ctx, size, steps);
	ctx.strokeStyle = strokeColor || "rgba(214, 214, 214, 1)";
	ctx.stroke();
}
function drawRow(ctx, size, steps){
	var height = size.height,
		width = size.width;
	var clampWidth = parseInt(width/steps) * steps;
	for(var i=0; i < height; i+=parseInt(height/steps)){
		ctx.moveTo(0, i);
		ctx.lineTo(clampWidth, i);
	}
}
function drawColumn(ctx, size, steps){
	var height = size.height,
		width = size.width;

	var clampHeight = parseInt(height/steps) * steps;
	for(var i=0; i < width; i+=parseInt(width/steps)){
		ctx.moveTo(i, 0);
		ctx.lineTo(i, clampHeight);
	}
}
//Grid Wall Serail Number
function gridArr(serialCnt , arr, row, col) {
     if(arr.length >= row * col){
            return arr;
     }
     var idx = arr.length?arr.length:0;
     var c = idx % col?idx % col:0;
     var r =  Math.floor(idx / col);
     var aboveCol = Math.abs((idx) - col);

     if(!r && !c){
          //Zero Row, Column
         var t_arr = [serialCnt, ++serialCnt, ++serialCnt, ++serialCnt];
     }else if(!r){
         //Zero Row
        var t_arr = [++serialCnt, ++serialCnt, ++serialCnt, arr[idx-1][1]];
     }else if(!c){
         //Zero Column
        var t_arr = [arr[aboveCol][2], ++serialCnt, ++serialCnt, ++serialCnt];
     }else{
        //if row and col non-zero
       var t_arr = [arr[aboveCol][2], ++serialCnt, ++serialCnt, arr[idx-1][1]];
     }
     let new_arr = arr.concat([t_arr]);
     return gridArr(serialCnt , new_arr, row, col);
}

function gridHexArr(serialCnt , arr, row, col) {
     if(arr.length >= row * col){
            return arr;
     }
     var idx = arr.length?arr.length:0;
     var c = idx % col?idx % col:0;
     var r =  Math.floor(idx / col);
     var aboveCol = Math.abs((idx) - col);
     var isEven = r % 2 ? 1 : 0;

     if(!r && !c){
          //Zero Row, Column
         var t_arr = [serialCnt, ++serialCnt, ++serialCnt, ++serialCnt,++serialCnt, ++serialCnt];
     }else if(!r){
         //Zero Row
        var t_arr = [++serialCnt, ++serialCnt, ++serialCnt, ++serialCnt, arr[idx-1][1], ++serialCnt];
     }else if(!c && isEven){
         //Zero Column even
        var t_arr = [arr[aboveCol+1][3], ++serialCnt, ++serialCnt, ++serialCnt, ++serialCnt, arr[aboveCol][2]];
     }else if(!c && !isEven){
         //Zero Column odd
        var t_arr = [arr[aboveCol][3], ++serialCnt, ++serialCnt, ++serialCnt, ++serialCnt, ++serialCnt];
     }else{
        //if row and col non-zero
       var t_arr = [arr[aboveCol][2], ++serialCnt, ++serialCnt, arr[idx-1][1]];
     }
     let new_arr = arr.concat([t_arr]);
     return gridHexArr(serialCnt , new_arr, row, col);
}

//Split Array in Chunks
function chunk(arr, n, size) {
   let end = n + size;
   if(end >= arr.length){
      return [arr.slice(n, arr.length)];
   }
   let new_arr = arr.slice(n, end);
   return [].concat([new_arr], chunk(arr, n + size,  size));
}


function nonJunction(cell, neighbour, junction){
  var ce = junction[cell[0]][cell[1]];
  return neighbour.filter(function(x, i){
     var dir = junction[x[0]][x[1]];
    if(cell[0] > x[0]){
         if(ce.T && dir.B){
            return true;
         }
      }else if(cell[0] < x[0]){
         if(ce.B && dir.T){
            return true;
         }
      }else if(cell[1] > x[1]){
         if(ce.L && dir.R){
            return true;
         }
      }else if(cell[1] < x[1]){
         if(ce.R && dir.L){
            return true;
         }
      }
  });
}
function getMoveDirection(pcell,ccell){
  if(pcell[0] > ccell[0]){
    return "T";
  }else if(pcell[0] < ccell[0]){
    return "B";
  }else if(pcell[1] > ccell[1]){
    return "L";
  }else if(pcell[1] < ccell[1]){
    return "R";
  }
}