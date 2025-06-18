import React from 'react';
import './GraphVisualizer.css';

function GraphVisualizer({ matrix, articulationPoints, bridges }) {
  const n = matrix.length;
  const radius = 180;
  const centerX = 250;
  const centerY = 250;

  const pastelColors = [
    '#ffcccb', '#d5f4e6', '#fefbd8', '#c2f0c2', '#e0bbE4',
    '#fcd5ce', '#f1f7b5', '#d0f4de', '#c5e1a5', '#f9f9f9'
  ];

  const getCoords = (i) => {
    const angle = (2 * Math.PI * i) / n;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const isBridge = (i, j) =>
    bridges.some(([a, b]) => (a === i && b === j) || (a === j && b === i));

  return (
    <div className="graph-container">
      <h2 className="graph-title">📊 Graph Visualization</h2>
      <div className="svg-wrapper">
        <svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blurred" />
              <feMerge>
                <feMergeNode in="blurred" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {matrix.map((row, i) =>
            row.map((val, j) => {
              if (i < j && val === 1) {
                const { x: x1, y: y1 } = getCoords(i);
                const { x: x2, y: y2 } = getCoords(j);
                return (
                  <line
                    key={`edge-${i}-${j}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isBridge(i, j) ? '#007bff' : '#333'}
                    strokeWidth="2"
                  />
                );
              }
              return null;
            })
          )}

          {matrix.map((_, i) => {
            const { x, y } = getCoords(i);
            const isAP = articulationPoints.includes(i);
            const fill = isAP ? '#e74c3c' : pastelColors[i % pastelColors.length];
            const radius = isAP ? 20 : 15;

            return (
              <g key={`node-${i}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={fill}
                  stroke="#2c3e50"
                  strokeWidth={isAP ? 4 : 2}
                  filter={isAP ? 'url(#glow)' : ''}
                />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fill={isAP ? '#fff' : '#000'}
                  fontSize="12"
                  fontWeight="bold"
                >
                  {i}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default GraphVisualizer;



