import * as fs from 'fs';
import * as os from 'os';

class Line {
  a: {
    x: number;
    y: number;
  };
  b: {
    x: number;
    y: number;
  };
}

function getInputFile(): string {
  const homedir = os.homedir();
  const inputFile = homedir + '/src/github.com/josephdpurcell/adventofcode/apps/2021-12-05/src/day-5-input.txt';
  return inputFile;
}

function inputLineToLine(inputLine: string): Line {
  const parts = inputLine.split(' -> ');
  const start = parts[0].split(',');
  const end = parts[1].split(',');
  const line: Line = {
    a: {
      x: Number(start[0]),
      y: Number(start[1]),
    },
    b: {
      x: Number(end[0]),
      y: Number(end[1]),
    },
  };
  return line;
}

function plotPoint(graph: Record<number, Record<number, number>>, x: number, y: number): void {
  if (graph[x] === undefined) {
    graph[x] = {};
  }
  if (graph[x][y] === undefined) {
    graph[x][y] = 0;
  }
  graph[x][y] = graph[x][y] + 1;
}

function plot(graph: Record<number, Record<number, number>>, line: Line): void {
  // Check if the line is horizontal.
  if (line.a.x !== line.b.x && line.a.y !== line.b.y) {
    // console.debug(`Skipping plot of row because it is not horizontal or vertical... ${JSON.stringify(line)}`);
    return;
  }

  if (line.a.x === line.b.x) {
    // THIS WORKS.
    // We have a horizontal line.
    // We need to plot the start point, end point, and all points in between. X
    // is constant.
    const x = line.a.x;
    let startY = 0;
    let endY = 0;
    if (line.a.y > line.b.y) {
      startY = line.b.y;
      endY = line.a.y;
    } else {
      startY = line.a.y;
      endY = line.b.y;
    }
    for (let y = startY; y <= endY; y++) {
      plotPoint(graph, x, y);
    }
  } else if (line.a.y === line.b.y) {
    // THIS WORKS.
    // We have a vertical line.
    // We need to plot the start point, end point, and all points in between. Y
    // is constant.
    const y = line.a.y;
    let startX = 0;
    let endX = 0;
    if (line.a.x > line.b.x) {
      startX = line.b.x;
      endX = line.a.x;
    } else {
      startX = line.a.x;
      endX = line.b.x;
    }
    for (let x = startX; x <= endX; x++) {
      plotPoint(graph, x, y);
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

    // printGraph(graph);

    console.log(`Points with 2 or more lines crossing: ${count}`);
  });
}
