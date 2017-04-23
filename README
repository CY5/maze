#Maze Api
Maze Api can be used to Generate Maze and Solve maze
**Algorithm used to Generate Maze**
- Depth First Search
- Randomized Kruskal 

**Algorithm used to Solve Maze**
- Tremaux
- Iterative Deeping Search
- A*

check out 
- [2D Demo] (http://mazecy5.surge.sh)
- [Canvas Demo] (http://mazecy5.surge.sh/example/canvas_demo/)
- [3d Particle Demo] (http://particlemaze.surge.sh/index.html)


#Setup

##To Generate Maze
Algorithms is used to generate Random Maze from Grid/hexagon
algorithm are
- kruskal
- dfs

shapeName are
- square
- hexagon

```
var algo = new Algorithms(maxRow, maxCols, algorithm, shapeName)
var matrix = algo.run();
```

Matrix Generate from Above code is Consumed by Grid, Grid function is basic example to show how maze is created from Matrix.

***Matrix is Array of 1 and 0***
 where 1 represent two neigbhour node doesn't share edges while 0 represent there is a edge shared between two node i.e 0 represent path between two node

```
var grid = Grid(matrix, maxRow, maxCols, ctx, shapeName, style);
grid.run();
```

##To Solve Maze
The Matrix Generate Above is used by Solver to Solve Maze
Algorithm are:
- tremaux
- iterativeSearch
- astar

```
var sa = new Solver (maxRows, maxCol, algorithm, shapeType, matrix);
var start = getRandomInt(0, row);
var end = getRandomInt(0, row*col - 1);
var path = sa.run(start, end);
path.push(end);
```