import React, { useState, useCallback, useRef, useEffect } from "react";
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

  useEffect(() => {
    if (running) {
      const id = window.setInterval(() => {
        setCounter((counter) => counter + 1);
      }, speed);
      return () => window.clearInterval(id);
    }
  }, [running, speed]);

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
            setCounter(0);
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
      <div className="presetTitle">
        <h4>Preset Configurations</h4>
      </div>

      <div className="btnbar">
        <button
          onClick={() => {
            const newGrid = produce(grid, (gridCopy) => {
              for (let i = 5; i < 20; i++) {
                gridCopy[12][i] = 1;
              }
            });
            setGrid(newGrid);
          }}
        >
          Row
        </button>
        <button
          onClick={() => {
            const newGrid = produce(grid, (gridCopy) => {
              for (let i = 5; i < 20; i++) {
                gridCopy[i][12] = 1;
              }
            });
            setGrid(newGrid);
          }}
        >
          Column
        </button>
        <button
          onClick={() => {
            const newGrid = produce(grid, (gridCopy) => {
              for (let i = 12; i < 14; i++) {
                gridCopy[i][12] = 1;
                gridCopy[i][13] = 1;
              }
            });
            setGrid(newGrid);
          }}
        >
          Block
        </button>
        <button
          onClick={() => {
            const newGrid = produce(grid, (gridCopy) => {
              for (let i = 11; i < 14; i++) {
                gridCopy[12][i] = 1;
              }
            });
            setGrid(newGrid);
          }}
        >
          Blinker
        </button>
        <button
          onClick={() => {
            const newGrid = produce(grid, (gridCopy) => {
              for (let i = 11; i < 14; i++) {
                gridCopy[12][i] = 1;
              }
              for (let i = 12; i < 15; i++) {
                gridCopy[11][i] = 1;
              }
            });
            setGrid(newGrid);
          }}
        >
          Toad
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
        <h4>Generations:{counter}</h4>
      </div>
    </div>
  );
};

export default Grid;
