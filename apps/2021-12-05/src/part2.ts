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
  if (line.a.x === line.b.x) {
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
  } else {
    // We have a 45 degree line.
    // We need to plot the start point, end point, and all points in between...
    // which will be tricky because X and Y are not constant.
    // Choose an X.
    let startX = 0;
    let endX = 0;
    if (line.a.x > line.b.x) {
      startX = line.b.x;
      endX = line.a.x;
    } else {
      startX = line.a.x;
      endX = line.b.x;
    }
    // Choose a Y. We won't have an endY; we'll assume 45 degree angle results
    // in the final y iteration equalling endY.
    let startY = 0;
    if (line.a.y > line.b.y) {
      startY = line.b.y;
    } else {
      startY = line.a.y;
    }
    let y = startY;
    for (let x = startX; x <= endX; x++) {
      plotPoint(graph, x, y);
      y = y + 1;
    }
  }
}

function printGraph(graph: Record<number, Record<number, number>>, limitX: number, limitY: number): void {
  for (let x = 1; x <= limitX; x++) {
    let line = '';
    for (let y = 1; y <= limitY; y++) {
      line = line + (graph[x] === undefined || graph[x][y] === undefined ? '.' : String(graph[x][y])) + ' ';
    }
    console.log(String(x).padEnd(12) + line);
  }
}

export function part2(): void {
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

    printGraph(graph, 1000, 1000);

    console.log(`Points with 2 or more lines crossing: ${count}`);
  });
}
