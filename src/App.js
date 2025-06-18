// src/App.js
import React, { useState } from 'react';
import MatrixInput from './components/MatrixInput';
import GraphVisualizer from './components/GraphVisualizer';
import { analyzeGraph, matrixToAdjList } from './components/GraphAnalyzer';
import './App.css';

function App() {
  const [nodeCount, setNodeCount] = useState(5);
  const [matrix, setMatrix] = useState(Array(5).fill().map(() => Array(5).fill(0)));
  const [articulationPoints, setArticulationPoints] = useState([]);
  const [bridges, setBridges] = useState([]);

  const handleAnalyze = () => {
    const adjList = matrixToAdjList(matrix);
    const result = analyzeGraph(adjList, nodeCount);
    setArticulationPoints(result.articulationPoints);
    setBridges(result.bridges);
  };

  const handleNodeCountChange = (e) => {
    const val = parseInt(e.target.value);
    if (val >= 2 && val <= 20) {
      setNodeCount(val);
      setMatrix(Array(val).fill().map(() => Array(val).fill(0)));
      setArticulationPoints([]);
      setBridges([]);
    }
  };

  return (
    <div className="app-wrapper">
      <h1 className="title">🔗 Network Reliability Analyzer</h1>

      <div className="controls">
        <label htmlFor="nodeInput">Number of Nodes:</label>
        <input
          id="nodeInput"
          type="number"
          value={nodeCount}
          min={2}
          max={20}
          onChange={handleNodeCountChange}
        />
        <button onClick={handleAnalyze}>Analyze Graph</button>
      </div>

      {/* Matrix comes first */}
      <div className="section">
        <MatrixInput matrix={matrix} setMatrix={setMatrix} />
      </div>

      {/* Graph below the matrix */}
      <div className="section">
        <GraphVisualizer
          matrix={matrix}
          articulationPoints={articulationPoints}
          bridges={bridges}
        />
      </div>
    </div>
  );
}

export default App;



