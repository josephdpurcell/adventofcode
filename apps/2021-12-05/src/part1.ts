import * as fs from 'fs';
import * as os from 'os';

class Line {
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
}

function getInputFile(): string {
  const homedir = os.homedir();
  const inputFile =
    homedir + '/src/github.com/josephdpurcell/adventofcode/apps/2021-12-05/src/day-5-input.txt';
  return inputFile;
}

function inputLineToLine(inputLine: string): Line {
  const parts = inputLine.split(' -> ');
  const start = parts[0].split(',');
  const end = parts[1].split(',');
  const line: Line = {
    start: {
      x: Number(start[0]),
      y: Number(start[1]),
    },
    end: {
      x: Number(end[0]),
      y: Number(end[1]),
    },
  };
  return line;
}

function plot(graph: Record<number, Record<number, number>>, line: Line): void {
  // const orderedLine = line;
  let orderedLine: Line;
  if (line.start.x > line.end.x) {
    // start.X is further to the right, so plot the end first.
    orderedLine = {
      start: {
        x: line.end.x,
        y: line.end.y,
      },
      end: {
        x: line.start.x,
        y: line.start.y,
      },
    };
  } else {
    // start.X is further to the left, so plot the start first.
    orderedLine = {
      start: {
        x: line.start.x,
        y: line.start.y,
      },
      end: {
        x: line.end.x,
        y: line.end.y,
      },
    };
  }

  // Check if the line is horizontal.
  if (orderedLine.start.x !== orderedLine.end.x && orderedLine.start.y !== orderedLine.end.y) {
    // console.debug(`Skipping plot of row because it is not horizontal or vertical... ${JSON.stringify(line)}`);
    return;
  }

  if (orderedLine.start.x === orderedLine.end.x) {
    // We have a horizontal line.
    let start = 0;
    let end = 0;
    if (orderedLine.start.y > orderedLine.end.y) {
      start = orderedLine.start.y;
      end = orderedLine.end.y;
    } else {
      start = orderedLine.end.y;
      end = orderedLine.start.y;
    }
    const x = orderedLine.start.x;
    if (graph[x] === undefined) {
      graph[x] = {};
    }
    for (let y = start; y <= end; y++) {
      if (graph[x][y] === undefined) {
        graph[x][y] = 0;
      }
      graph[x][y] = graph[x][y] + 1;
    }
  } else {
    // We have a vertical line.
    const start = orderedLine.start.x;
    const end = orderedLine.end.x;
    const y = orderedLine.start.y;
    for (let x = 0; x < end - start; x++) {
      if (graph[x] === undefined) {
        graph[x] = {};
      }
      if (graph[x][y] === undefined) {
        graph[x][y] = 0;
      }
      graph[x][y] = Number(graph[x][y]) + 1;
    }
  }
}

function printGraph(graph: Record<number, Record<number, number>>): void {
  for (let x = 1; x <= 1000; x++) {
    let line = '';
    for (let y = 1; y <= 1000; y++) {
      line = line + (graph[x] === undefined || graph[x][y] === undefined ? '.' : String(graph[x][y]));
    }
    console.log(line);
  }
}

export function part1(): void {
  const inputFile = getInputFile();

  const graph: Record<number, []> = {};

  fs.readFile(inputFile, 'utf8', (err, data) => {
    const parsedData = data.toString().split('\n');
    for (const i in parsedData) {
      const inputLine = parsedData[i];
      if (inputLine === '') {
        continue;
      }
      const line = inputLineToLine(inputLine);
      plot(graph, line);
    }

    let count = 0;
    for (const x in graph) {
      for (const y in graph[x]) {
        if (graph[x][y] > 1) {
          // console.log(`we have one! ${x},${y} = ${graph[x][y]}`);
          count++;
        }
      }
    }

    printGraph(graph);

    console.log(`Points with 2 or more hits: ${count}`);
  });
}
