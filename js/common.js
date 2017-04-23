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
 * toggle the value
 * @param  {val}
 * @return {1 or 0}
 */
 function toogle(val){
  return (val == 0 ? 1 : 0);
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
 * Shuffles Array Randomly
 * @param   array 
 * @return  array 
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


/**
 * Grid Square shape Wall in Serial Number
 * @param  {[Number]} serialCnt [counter]
 * @param  {[Number]} arr       [Array of 0,1]
 * @param  {[Number]} row       [total Number of Row]
 * @param  {[Number]} col       [total Number of Column]
 */
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

/**
 * Grid Hexagon Shape Wall in Serial Number
 * @param  {[Number]} serialCnt [counter]
 * @param  {[Number]} arr       [Array of 0,1]
 * @param  {[Number]} row       [total Number of Row]
 * @param  {[Number]} col       [total Number of Column]
 */
function gridHexArr(serialCnt , arr, row, col) {
     if(arr.length >= row * col){
            return arr;
     }
     var idx = arr.length?arr.length:0;
     var c = idx % col?idx % col:0;
     var r =  Math.floor(idx / col);
     var aboveCol = Math.abs((idx) - col);
     var isOdd = r % 2 ? 1 : 0;
     var isLast = !(c % (col - 1)) && c > 0 ? 1 : 0;

     if (!r && !c) {
          //Zero Row, Column
         var t_arr = [serialCnt, ++serialCnt, ++serialCnt, ++serialCnt,++serialCnt, ++serialCnt];
     } else if (!r) {
         //Zero Row
        var t_arr = [++serialCnt, ++serialCnt, ++serialCnt, ++serialCnt, arr[idx-1][1], ++serialCnt];
     } else if (!c && isOdd) {
         //Zero Column even
        var t_arr = [arr[aboveCol+1][3], ++serialCnt, ++serialCnt, ++serialCnt, ++serialCnt, arr[aboveCol][2]];
     } else if (!c && !isOdd) {
         //Zero Column odd
        var t_arr = [arr[aboveCol][3], ++serialCnt, ++serialCnt, ++serialCnt, ++serialCnt, ++serialCnt];
     } else if (isOdd && isLast) {
        // Odd Row Last Column
        var t_arr = [++serialCnt, ++serialCnt, ++serialCnt, ++serialCnt, arr[idx-1][1], arr[aboveCol][2]]; 
     }else if(isOdd) {
        //if row and col non-zero and Not Odd Row Last Column
       var t_arr = [arr[aboveCol+1][3], ++serialCnt, ++serialCnt, ++serialCnt, arr[idx-1][1], arr[aboveCol][2]];
     }else {
        //if row and col non-zero and Not Odd Row Last Column
       var t_arr = [arr[aboveCol][3], ++serialCnt, ++serialCnt, ++serialCnt, arr[idx-1][1], arr[aboveCol-1][2]];
     }
     let new_arr = arr.concat([t_arr]);
     return gridHexArr(serialCnt , new_arr, row, col);
}

/**
 * Flatten Nested Array
 * @param   array
 * @return  array
 */
function flatten (arr){ 
    return arr.reduce(
      function (acc, val) { 
        return acc.concat(Array.isArray(val) ? flatten(val) : val)
      },
      []
    );
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
 * Get Cell for Key
 * @param  key  
 * @param  cells
 * @return value
 */
function getCell(key, cells) {
  return cells[key];
}

/**
 * Intersect Between two array
 * @param  arr1 
 * @param  arr2
 * @return 
 */
function intersect(arr1, arr2) {
  let arr3 = arr1.filter(function(n) {
      return arr2.indexOf(n) !== -1;
  });
  return arr3;
}

function centroidPoly (sides) {
  var A = areaPolygon (sides);
  var len = sides.length;
  var xTemp= yTemp=0;
  for (let i = 0; i < len; i++) {
    let nexti = (i + 1) % len;
    xTemp += (sides[i][0] + sides[nexti][0]) * (sides[i][0] * sides[nexti][1] - sides[i][1] * sides[nexti][0]);
  }
  var Cx = (1 / (6 * A) ) * xTemp;

  for (let i = 0; i < len; i++) {
    let nexti = (i + 1) % len;
    yTemp += (sides[i][1] + sides[nexti][1]) * (sides[i][0] * sides[nexti][1] - sides[i][1] * sides[nexti][0]);
  }
  var Cy = (1 / (6 * A) ) * yTemp;
  return [Cx, Cy];
}


function areaPolygon (sides) {
  var sign =1;
  var a = 0;
  var len = sides.length;
  for (var i = 0; i < len; i++) {
    let nexti = (i + 1) % len;
    a += sides[i][0] * sides[nexti][1] - sides[i][1] * sides[nexti][0];
  }
  return Math.abs(a / 2);
}

function euclideanDistance (p1, p2) {
  return Math.sqrt( Math.pow((p2[0] - p1[0]), 2) + Math.pow((p2[0] - p1[0]), 2) );
} 

function magnitudeVector (pt) {
  return Math.sqrt(Math.pow(pt[0], 2) + Math.pow(pt[1], 2));
}
function distancePoint (p1, p2) {
  return p2 - p1;
}


function lerp(a, b, w)
{
  return a + w*(b-a);
}

function normalizeVector (pt) {
    var d = magnitudeVector (pt);
    return [pt[0] / d, pt[1] / d];
}

function vectorAngleCos (pt1, pt2) {
  var x1 = Math.max(Math.min(1, pt1[0]), -1);
  var y1 = Math.max(Math.min(1, pt1[1]), -1);
  var x2 = Math.max(Math.min(1, pt2[0]), -1);
  var y2 = Math.max(Math.min(1, pt2[1]), -1);
  return Math.acos (x1 * x2 + y1 * y2)
}


function vectorAngleTan2 (pt1) {  
 //return Math.atan2(pt2[1],pt2[0]) - Math.atan2(pt1[1],pt1[0]);
 return Math.atan2(pt1[1], pt1[0]);
}

function midpoint (pt1, pt2) {
  return [(pt1[0] + pt2[0])/2 , (pt1[1] + pt2[1])/2];
}

function slope (pt1, pt2) {
  return (pt2[1] - pt1[1]) / (pt2[0] - pt1[0]);
}