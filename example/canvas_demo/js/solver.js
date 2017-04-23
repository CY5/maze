window.Solver = (function (maxRows, maxCol, algorithm, shapeType, matrix) {
    'use strict';
    let startTime, endTime;

    function tremaux (begin, end) {
    	var visited = [];
        var st = initShapes();
        if (!st.hasOwnProperty(shapeType)) {
            throw ("Invalid Shape Type");
        }
        st = st[shapeType]();
        var walls = st.wall,
            cells = st.cell,
            s = st.side,
            goal = 0;
    	function initShapes() {
            function hexagon() {
                let cells = {},
                	walls = [],
                	i = 0,
                	s = 6;
                gridHexArr(1, [], maxRows, maxCol).forEach(function(ele, idx) {
                    let mx = matrix.slice(s*i, (s*i)+s);
                    let t_wall = {};
                    ele.map(function(val, j) {
                    	t_wall[val] = mx[j];
                        walls[val] = Array.isArray(walls[val]) ? walls[val].concat(idx) : [idx];
                    });
                    cells[idx] = {
                        'wall': t_wall,
                        'visited': 0
                    }
                    i++;
                });
                return {
                    wall: walls,
                    cell: cells,
                    side: s
                }
            }

            function square() {
                let walls = [],
                    cells = {},
                    i = 0,
                    s = 4;
                gridArr(1, [], maxRows, maxCol).forEach(function(ele, idx) {
                    let mx = matrix.slice(s*i, (s*i)+s);
                    let t_wall = {};
                    ele.map(function(val, j) {
                    	t_wall[val] = mx[j];
                        walls[val] = Array.isArray(walls[val]) ? walls[val].concat(idx) : [idx];
                    });
                    cells[idx] = {
                        'wall': t_wall,
                        'visited': 0
                    };
                    i++;
                });
                return {
                    cell: cells,
                    wall: walls,
                    side: s
                }
            }
            return {
                hexagon: function() {
                    return hexagon();
                },
                square: function() {
                    return square();
                }
            }
        };

        function nonVisited(neighbour) {
            return neighbour.filter(function(x, i) {
                return !cells[x]['visited'];
            });
        }

        function getAdjacentCell(cell) {
            let neighbhour = getBounds(cell);
            return neighbhour.map(function(x, i) {
                let arr = walls[x].filter(function(y, j) {
                    return y !== cell;
                });
                return arr[0];
            }).filter(function (a) {
                return a !==undefined;
            });
        }

        function getBounds(cell) {
            return Object.entries(cells[cell]['wall']).filter(function (val, keys) {
				  return !val[1];
				}).reduce (function (obj, [k,v]) {
					return obj.concat(k);
				},[]);
        }

        function start(cell) {
            var neighbour = nonVisited(getAdjacentCell(cell));

            if (cell === end){
            	console.log("Complete");
                return visited;
            }

            if (neighbour.length) {
                var ncell = neighbour[getRandomInt(0, neighbour.length - 1)];
                
                cells[cell]['visited'] = 1;
                cells[ncell]['visited'] = 1;
                visited.push(cell);
                return start(ncell);
            } else {
                var pcell = visited.pop();
                return start(pcell);
            }

        }

        return start(begin);
    }
	var algo = {
        'tremaux': function(begin, end) {
            return tremaux (begin, end);
        }
    }
    return {
        run: function(begin, end) {
            startTime = performance.now();
            let mat = algo[algorithm](begin, end);
            endTime = performance.now();
            return mat;
        },
        checkExceutionTime: function() {
            return (endTime - startTime);
        }
    };
});
