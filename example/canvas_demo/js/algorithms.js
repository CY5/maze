

window.Algorithms = (function(maxRows, maxCol, algorithm, shapeType) {
    "use strict";
    let startTime, endTime;

    function dfsAlgo() {
        var visited = [];
        let st = initShapes();
        if (!st.hasOwnProperty(shapeType)) {
            throw ("Invalid Shape Type");
        }
        st = st[shapeType]();
        let walls = st.wall,
            cells = st.cell,
            s = st.side;
        let matrix = Array_1D(1, maxRows * maxCol * s);

        function initShapes() {
            function hexagon() {
                let walls = [],
                    cells = {},
                    x = -1,
                    y = 0;
                gridHexArr(1, [], maxRows, maxCol).forEach(function(ele, idx) {
                    if (!(y % maxCol)) {
                        x++;
                        y = 0;
                    }
                    cells[idx] = {
                        'wall': ele,
                        'visited': 0
                    }
                    ele.map(function(val, j) {
                        walls[val] = Array.isArray(walls[val]) ? walls[val].concat(idx) : [idx];
                    });
                });
                return {
                    wall: walls,
                    cell: cells,
                    side: 6
                }
            }

            function square() {
                let walls = [],
                    cells = {},
                    x = -1,
                    y = 0;
                gridArr(1, [], maxRows, maxCol).forEach(function(ele, idx) {
                    if (!(y % maxCol)) {
                        x++;
                        y = 0;
                    }
                    cells[idx] = {
                        'wall': ele,
                        'visited': 0
                    }
                    ele.map(function(val, j) {
                        walls[val] = Array.isArray(walls[val]) ? walls[val].concat(idx) : [idx];
                    });
                });
                return {
                    cell: cells,
                    wall: walls,
                    side: 4
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

        function inside(cell) {
            if ((cell[0] >= 0 && cell[0] <= maxRows - 1) && (cell[1] >= 0 && cell[1] <= maxCol - 1)) {
                return true;
            }
            return false;
        }

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
            return cells[cell]['wall'];
        }

        function start(cell) {
            var neighbour = nonVisited(getAdjacentCell(cell));
            if (!visited.length) {
                console.log("Complete");
                return matrix;
            } else if (neighbour.length) {
                var ncell = neighbour[getRandomInt(0, neighbour.length - 1)];
                //Remove The Wall Between Neighbhour
                cells[cell]['visited'] = 1;
                cells[ncell]['visited'] = 1;
                let arr1 = getCell(cell, cells);
                let arr2 = getCell(ncell, cells);
                let commonEle = intersect(arr1.wall, arr2.wall)[0];
                let i1 = arr1.wall.indexOf(commonEle),
                    i2 = arr2.wall.indexOf(commonEle);
                let idx1 = parseInt(cell) * s,
                    idx2 = parseInt(ncell) * s;
                matrix[idx1 + i1] = 0;
                matrix[idx2 + i2] = 0;
                visited.push(ncell);
                return start(ncell);

            } else {
                var pcell = visited.pop();
                return start(pcell);
            }

        }

        function initCell() {
            var cell = getRandomInt(0, maxRows - 1);
            visited.push(cell);
            return cell;
        }

        return start(initCell());
    }

    function kruskalAlgo() {

        let st = initShapes();
        if (!st.hasOwnProperty(shapeType)) {
            throw ("Invalid Shape Type");
        }
        st = st[shapeType]();
        let walls = st.wall,
            cells = st.cell,
            s = st.side;

        let matrix = Array_1D(1, maxRows * maxCol * s);

        function initShapes() {
            function hexagon() {
                let walls = [],
                    cells = {},
                    x = -1,
                    y = 0;
                gridHexArr(1, [], maxRows, maxCol).forEach(function(ele, idx) {
                    if (!(y % maxCol)) {
                        x++;
                        y = 0;
                    }
                    cells['node_' + idx] = {
                        'parent': 'node_' + idx,
                        'rank': 0,
                        'pos': [x, y++],
                        'val': ele
                    }
                    ele.map(function(val, j) {
                        walls[val] = Array.isArray(walls[val]) ? walls[val].concat('node_' + idx) : ['node_' + idx];
                    });
                });
                shuffleArray(walls);
                return {
                    cell: cells,
                    wall: walls,
                    side: 6
                }
            }

            function square() {
                let walls = [],
                    cells = {},
                    x = -1,
                    y = 0;
                gridArr(1, [], maxRows, maxCol).forEach(function(ele, idx) {
                    if (!(y % maxCol)) {
                        x++;
                        y = 0;
                    }
                    cells['node_' + idx] = {
                        'parent': 'node_' + idx,
                        'rank': 0,
                        'pos': [x, y++],
                        'val': ele
                    }
                    ele.map(function(val, j) {
                        walls[val] = Array.isArray(walls[val]) ? walls[val].concat('node_' + idx) : ['node_' + idx];
                    });
                });
                shuffleArray(walls);
                return {
                    cell: cells,
                    wall: walls,
                    side: 4
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

        function start(matrix) {
            if (!(walls.length)) {
                console.log("complete");
                return matrix;
            } else {
                var wall = walls.pop();
                if (Array.isArray(wall) && wall.length > 1) {
                    let isMerge = Union(wall[0], wall[1]);
                    if (isMerge) {
                        let arr1 = getCell(wall[0], cells);
                        let arr2 = getCell(wall[1], cells);
                        let commonEle = intersect(arr1.val, arr2.val)[0];
                        let i1 = arr1.val.indexOf(commonEle),
                            i2 = arr2.val.indexOf(commonEle);

                        let idx1 = parseInt(wall[0].split("_")[1]) * s,
                            idx2 = parseInt(wall[1].split("_")[1]) * s;
                        matrix[idx1 + i1] = 0;
                        matrix[idx2 + i2] = 0;
                        return start(matrix);
                    }
                }
                return start(matrix);
            }
        }

        function Union(x, y) {
            let rtX = findRoot(x),
                rtY = findRoot(y);
            let xRoot = getCell(rtX, cells),
                yRoot = getCell(rtY, cells);

            // x and y are already in the same set
            if (xRoot.parent === yRoot.parent) {
                return 0;
            }
            // x and y are not in same set, so we merge them
            if (xRoot.rank < yRoot.rank) {
                //xRoot = yRoot;
                updateMazeCell(rtX, yRoot);
            } else if (xRoot.rank > yRoot.rank) {
                //yRoot = xRoot;
                updateMazeCell(rtY, xRoot);
            } else {
                //yRoot = xRoot;
                xRoot.rank++;
                updateMazeCell(rtY, xRoot);
            }
            return 1;
        }

        function updateMazeCell(node, treeNode) {
            cells[node].parent = treeNode.parent;
            cells[node].rank = treeNode.rank;
        }

        function findRoot(x) {
            let cel = getCell(x, cells);
            if (cel.parent === x)
                return x;
            else
                return findRoot(cel.parent);
        }



        return start(matrix);
    }
    var algo = {
        'dfs': function(argument) {
            return dfsAlgo();
        },
        'kruskal': function() {
            return kruskalAlgo();
        }
    }
    return {
        run: function() {
            startTime = performance.now();
            let mat = algo[algorithm]();
            endTime = performance.now();
            return mat;
        },
        checkExceutionTime: function() {
            return (endTime - startTime);
        }
    }
});
