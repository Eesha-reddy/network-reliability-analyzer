# 🔗 Network Reliability Analyzer

A visual and interactive React-based web app to **analyze and visualize network reliability** using fundamental graph theory concepts such as **Articulation Points** and **Bridges**.

This project is built to help users explore and understand **critical components of undirected graphs** using an intuitive **adjacency matrix input** and beautiful **SVG-based visualizations**.

---


## 🚀 Features

- 🔢 Dynamic input for number of nodes (2–20)
- 🧮 Editable adjacency matrix with auto-symmetric filling
- 📊 Real-time analysis on button click
  - Detect **Articulation Points** (critical nodes)
  - Detect **Bridges** (critical edges)
- 🎨 Clean and responsive circular graph layout
  - **Red nodes**: Articulation Points
  - **Blue edges**: Bridges
  - **Gray nodes / Black edges**: Regular
- 🌈 Aesthetic gradient background and SVG styling

---

## 🛠️ Tech Stack

| Area               | Technology           |
|--------------------|----------------------|
| Frontend Framework | React.js             |
| Styling            | CSS (Custom + Flex)  |
| Visualization      | Pure SVG             |
| Algorithms         | Tarjan’s (DFS-based) |
| Interactivity      | React State & Hooks  |

---

## ⚙️ Algorithm Details

### 📍 Articulation Points (Cut Vertices)

- An **articulation point** is a vertex that, if removed, increases the number of connected components.
- **Tarjan's Algorithm** is used via **Depth First Search (DFS)**:
  - Maintains:
    - `disc[]`: discovery time of each node
    - `low[]`: lowest discovery time reachable
  - For each unvisited node:
    - Run DFS recursively
    - If a node `u` has a child `v` such that `low[v] ≥ disc[u]`, then `u` is an articulation point

### 🔗 Bridges (Cut Edges)

- A **bridge** is an edge which, if removed, increases the number of connected components.
- During DFS:
  - If `low[v] > disc[u]` for a child `v` of `u`, then edge `(u,v)` is a bridge.

Both these concepts are implemented in pure **JavaScript** inside a dedicated utility file (`GraphAnalyzer.js`).

---

## 🧮 Frontend Workflow

1. **Input Stage**
   - User enters number of nodes (say `n = 5`)
   - App generates an editable `n x n` adjacency matrix
   - Self-loops are disabled
   - Matrix is kept symmetric (undirected graph)

2. **Analysis Stage**
   - On clicking `Analyze Graph`, adjacency matrix is converted to an adjacency list
   - `analyzeGraph()` function is invoked using DFS to extract:
     - `articulationPoints[]`
     - `bridges[]`

3. **Visualization Stage**
   - All nodes are arranged in a **circular layout** using trigonometry
   - Edges are drawn as **straight SVG lines**
   - Styles applied:
     - 🔴 Red circles for articulation points
     - 🔵 Blue lines for bridges
     - ⚪ Pastel-colored circles for regular nodes
     - ⚫ Black lines for regular edges
   - Responsive layout with central alignment

---


