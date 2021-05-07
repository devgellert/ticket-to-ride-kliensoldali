import { reduce, forEach } from "lodash";

class GraphModel {
  static createUndirectedFromDirectedData = (data) =>
    reduce(
      data,
      (acc, elem) => [
        ...(acc || []),
        {
          from: Number(elem.from),
          to: Number(elem.to),
        },
        {
          from: Number(elem.to),
          to: Number(elem.from),
        },
      ],
      []
    );

  constructor(connections) {
    this.connections = connections;
    this.initiate();
  }

  initiate = () => {
    const vertexes = reduce(
      this.connections,
      (acc, { from, to }) => {
        const result = acc || [];
        if (!result.includes(from)) {
          result.push(from);
        }

        if (!result.includes(to)) {
          result.push(to);
        }

        return result;
      },
      []
    );

    this.color = {};
    forEach(vertexes, (vertex) => (this.color[vertex] = "white"));
  };

  areVertexesConnected(from, to) {
    let isConnected = false;

    const cb = (vertex) => {
      if (vertex === Number(to)) {
        isConnected = true;
      }
    };

    this.depthFirst(Number(from), cb);

    return isConnected;
  }

  depthFirst = (vertex, cb) => {
    this.color[vertex] = "grey";
    cb(vertex);
    const neighbours = this.getNeighbours(vertex);

    for (let neighbour of neighbours) {
      if (this.color[neighbour] === "white") {
        this.depthFirst(neighbour, cb);
      }
    }

    this.color[vertex] = "black";
  };

  getNeighbours = (vertex) => {
    const neighbours = [];
    for (let elem of this.connections) {
      if (elem.from === vertex) {
        neighbours.push(elem.to);
      }
    }
    return neighbours;
  };

  depthFirst2 = (visited, currentVertex, destinationVertex, path, cb) => {
    visited[currentVertex] = true;
    if (currentVertex === destinationVertex) {
      console.log("path found:", path);
      cb([...path]);
    } else {
      const neighbourVertexes = this.getNeighbours(currentVertex);

      for (let nextVertex of neighbourVertexes) {
        if (!visited[nextVertex]) {
          visited[nextVertex] = true;
          path.push(nextVertex);
          this.depthFirst2(visited, nextVertex, destinationVertex, path, cb);
          path.pop(nextVertex);
        }
      }
    }
    visited[currentVertex] = false;
  };

  getPath = (from, to) => {
    let res = [];
    const visited = [];
    const path = [Number(from)];
    this.depthFirst2(visited, Number(from), Number(to), path, (path) => {
      res = path;
    });
    return res;
  };
}

export default GraphModel;
