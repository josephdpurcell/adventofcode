import * as fs from 'fs';
import * as os from 'os';

export function getInputFile(): string {
  const homedir = os.homedir();
  const inputFile = homedir + '/src/github.com/josephdpurcell/adventofcode/apps/2021-12-07/src/input.txt';
  return inputFile;
}

export function get(): Record<number, number> {
  const inputFile = getInputFile();

  const data = fs.readFileSync(inputFile, 'utf8');

  const numbers = {};
  const parsedData = data.toString().replace(/\s+/g, '').split(',');
  console.log(parsedData);
  for (const i in parsedData) {
    const number = parsedData[i];
    if (number === '') {
      continue;
    }
    if (numbers[number] === undefined) {
      numbers[number] = 0;
    }
    numbers[number] = numbers[number] + 1;
  }

  return numbers;
}

function fuelCalc(targetPos: number, currentPos: number, count: number): number {
  return Math.abs(targetPos - currentPos) * count;
}

export type FuelFunction = (targetPos: number, currentPos: number, count: number) => number;

export function getMoves(crabs: Record<number, number>, fn?: FuelFunction): Record<number, number> {
  let max = undefined;
  let min = undefined;
  for (const i in crabs) {
    const pos = Number(i);
    if (max === undefined || pos > max) {
      max = pos;
    }
    if (min === undefined || pos < min) {
      min = pos;
    }
  }
  console.log(`max ${max} min ${min}`);
  const moves: Record<number, number> = {};
  for (let targetPos = min; targetPos <= max; targetPos++) {
    console.log(`${targetPos} check`);
    moves[targetPos] = 0;
    for (const i in crabs) {
      const pos = Number(i);
      const count = crabs[i];
      // const thisFuel = Math.abs(targetPos - pos) * count;
      const thisFuel = fn(targetPos, pos, count);
      // console.log(`    Move ${count} crabs from ${pos} to ${targetPos} = ${thisFuel}`);
      moves[targetPos] = moves[targetPos] + thisFuel;
    }
  }
  return moves;
}

export function main(): void {
  const crabs = get();
  console.debug(crabs);

  const moves = getMoves(crabs, fuelCalc);

  let alignFuel = undefined;
  let alignPos = undefined;
  for (const i in moves) {
    if (alignFuel === undefined || moves[i] < alignFuel) {
      alignFuel = moves[i];
      alignPos = Number(i);
    }
  }

  console.log(`Align at position ${alignPos} requires ${alignFuel}`);
}
