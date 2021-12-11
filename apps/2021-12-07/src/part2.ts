import { get, getMoves, FuelFunction } from './part1';

const fuelCalc: FuelFunction = (targetPos: number, currentPos: number, count: number): number => {
  const dist = Math.abs(targetPos - currentPos);
  // Nth Triangle Number = 1 + 2 + 3... + N = (N^2 + N) / 2
  const nthTriangleNumber = (dist ** 2 + dist) / 2;
  return nthTriangleNumber * count;
};

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
