import { map, forEach, findIndex } from "lodash";

// TODO: delete
const testConnections = [
  {
    from: 1,
    to: 2,
  },
  {
    from: 2,
    to: 3,
  },
  {
    from: 2,
    to: 10,
  },
  {
    from: 2,
    to: 21,
  },
  {
    from: 3,
    to: 4,
  },
  {
    from: 4,
    to: 5,
  },
  {
    from: 5,
    to: 6,
  },
];

class GraphModel {
  constructor(connections) {
    this.connections = connections;
    this.initiate();
  }

  initiate = () => {
    const vertexes = this.connections.reduce((acc, { from, to }) => {
      const result = acc || [];
      if (!result.includes(from)) {
        result.push(from);
      }

      if (!result.includes(to)) {
        result.push(to);
      }

      return result;
    }, []);

    this.color = {};
    vertexes.forEach((vertex) => (this.color[vertex] = "white"));
  };

  areVertexesConnected(from, to) {
    let isConnected = false;

    const cb = (vertex) => {
      if (vertex === to) {
        isConnected = true;
      }
    };

    this.depthFirst(from, cb);

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
}

export default GraphModel;
