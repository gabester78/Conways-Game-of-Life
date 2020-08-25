import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const rowsNum = 25;
const colsNum = 25;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const clearGrid = () => {
  const rows = [];
  for (let i = 0; i < rowsNum; i++) {
    rows.push(Array.from(Array(colsNum), () => 0));
  }
  return rows;
};

const Grid = () => {
  const [grid, setGrid] = useState(() => {
    return clearGrid();
  });

  const [counter, setCounter] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runAutomaton = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < rowsNum; i++) {
          for (let k = 0; k < colsNum; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < rowsNum && newK >= 0 && newK < colsNum) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    setTimeout(runAutomaton, speed);
  }, [speed]);

  const slowerAutomaton = () => {
    setSpeed(speed + 250);
  };

  const fasterAutomaton = () => {
    setSpeed(speed - 250);
  };

  return (
    <div>
      <div className="btnbar">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runAutomaton();
            }
          }}
        >
          {running ? "Stop Automaton" : "Start Automaton"}
        </button>
        <button
          onClick={() => {
            setGrid(clearGrid());
          }}
        >
          Clear Grid
        </button>
        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < rowsNum; i++) {
              rows.push(
                Array.from(Array(colsNum), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }
            setGrid(rows);
          }}
        >
          Fill Random Cells
        </button>
        <button disabled={running} onClick={fasterAutomaton}>
          Faster Automaton
        </button>
        <button disabled={running} onClick={slowerAutomaton}>
          Slower Automaton
        </button>
      </div>
      <div className="grid">
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              className="cells"
              key={`${i}-${k}`}
              onClick={
                running
                  ? null
                  : () => {
                      const newGrid = produce(grid, (gridCopy) => {
                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                      });
                      setGrid(newGrid);
                    }
              }
              style={{
                backgroundColor: grid[i][k] ? "#F5CB5C" : undefined,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
