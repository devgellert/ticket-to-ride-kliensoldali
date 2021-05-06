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
}

export default GraphModel;
