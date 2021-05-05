import { map, forEach } from "lodash";

class GraphService {
  transformDestinations = (destinations) =>
    map(destinations, ({ from, to, id }) => ({
      id,
      from,
      to,
    }));

  transformConnections = (connections) =>
    map(connections, ({ from, to, id }) => ({
      id,
      from,
      to,
    }));

  construct = (connectionsData) => {
    const connections = this.transformConnections(connectionsData);

    const graph = {};
    forEach(connections, ({ from, to }) => {
      graph[from] = [];
      graph[to] = [];
    });

    connections.forEach(({ from, to }) => {
      graph[from] = [...graph[from], to];
      graph[to] = [...graph[to], from];
    });
    this.graph = graph;
  };

  isConnected = (fromCityId, toCityId) => {
    if (!this.graph) throw new Error("No graph constructed");

    if (!this.graph[fromCityId]) return false;

    let connected = false;
    const recursive = (current) => {
      if (connected) return;

      const pointingList = this.graph[current];
      if (!pointingList || pointingList.length === 0) return;

      pointingList.forEach((point) => {
        if (point === toCityId) {
          connected = true;
        } else {
          recursive(point, current);
        }
      });
    };

    recursive(fromCityId);

    return connected;
  };
}

export default GraphService;
