// src/components/MatrixInput.js
import React from 'react';

function MatrixInput({ matrix, setMatrix }) {
  const handleChange = (i, j, value) => {
    const newMatrix = matrix.map(row => [...row]);
    newMatrix[i][j] = value;
    newMatrix[j][i] = value; // Keep it symmetric
    setMatrix(newMatrix);
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Adjacency Matrix</h3>
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    disabled={i === j}
                    value={cell}
                    onChange={(e) =>
                      handleChange(i, j, parseInt(e.target.value) || 0)
                    }
                    style={{
                      width: '30px',
                      textAlign: 'center',
                      margin: '2px',
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MatrixInput;
