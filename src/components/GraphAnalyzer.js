// src/components/GraphAnalyzer.js

export function matrixToAdjList(matrix) {
    const adjList = {};
    for (let i = 0; i < matrix.length; i++) {
      adjList[i] = [];
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 1) adjList[i].push(j);
      }
    }
    return adjList;
  }
  
  export function analyzeGraph(adjList, n) {
    let time = 0;
    const visited = new Array(n).fill(false);
    const disc = new Array(n).fill(-1);
    const low = new Array(n).fill(-1);
    const parent = new Array(n).fill(-1);
    const ap = new Set();
    const bridges = [];
  
    function dfs(u) {
      visited[u] = true;
      disc[u] = low[u] = ++time;
      let children = 0;
  
      for (let v of adjList[u]) {
        if (!visited[v]) {
          children++;
          parent[v] = u;
          dfs(v);
  
          low[u] = Math.min(low[u], low[v]);
  
          // Articulation Point
          if (parent[u] === -1 && children > 1) ap.add(u);
          if (parent[u] !== -1 && low[v] >= disc[u]) ap.add(u);
  
          // Bridge
          if (low[v] > disc[u]) bridges.push([u, v]);
        } else if (v !== parent[u]) {
          low[u] = Math.min(low[u], disc[v]);
        }
      }
    }
  
    for (let i = 0; i < n; i++) {
      if (!visited[i]) dfs(i);
    }
  
    return {
      articulationPoints: Array.from(ap),
      bridges: bridges,
    };
  }
  