window.Solver = function (maxRows, maxCol, algorithm, shapeType, matrix) {
    'use strict';
    let startTime, endTime;
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

    function iterDeepSrch(begin, end) {
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
        

        function nonVisited(neighbour, visited) {
            return  neighbour.filter(function(item){
                        return visited.indexOf(item) === -1;
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

        function iter (r, g, d) {
            var v = dfs (r, g, d, []);
            if(v && v.length){
                console.log("Complete", v);
                return v;
            }
            return iter(r, g, ++d);
        }

        function dfs (r, g, d, v) {
            if (d === 0){
                if (r === g)
                    return r;
                else
                    return null;
            } else {
                var node = nonVisited(getAdjacentCell(r), v);
                v = v.concat(r);
                for (let i=0; i<node.length; i++) {

                    let f = dfs (node[i], g, d - 1, v);
                    if (f) {
                        return [].concat(r, f);
                    }
                }
                return null;
            }
        }
        return iter(begin, end, 0);
    }

    function astarSearch(begin, end) {
        var visited = [];
        var st = initShapes();
        if (!st.hasOwnProperty(shapeType)) {
            throw ("Invalid Shape Type");
        }
        st = st[shapeType]();
        var walls = st.wall,
            cells = st.cell,
            s = st.side;
        

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
        function getCellVal(idx, w) {
            return [parseInt(idx / w), idx % w];
        }
        function manDist(cell, goal) {
            var c = getCellVal(cell, maxCol);
            var g = getCellVal(goal, maxCol);
            return Math.abs(c[0] - g[0]) + Math.abs(c[1] - g[1]);
        }

        function sum (gn, hn) {
            return gn + hn;
        }
        function start (cell) {
            var neighbour = nonVisited(getAdjacentCell(cell));

            if (cell === end){
                console.log("Complete");
                return visited;
            }

            if (neighbour.length) {

                var ncell = neighbour.map(function(ele, idx){
                    let fn = sum (manDist(cell, ele), manDist(ele, end));
                    return {"ele":ele, 'fn' : fn};
                }).sort(function(a, b){
                    return a['fn'] - b['fn'];
                }).slice(0, 1)[0]['ele'];
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
        },
        'iterativeSearch' : function(begin, end) {
            return iterDeepSrch(begin, end);
        },
        'astar' : function(begin, end) {
            return astarSearch(begin, end);
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
};
