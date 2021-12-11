import { getInputFile } from './part1';
import * as fs from 'fs';

export function getPopulation(): Record<number, number> {
  const inputFile = getInputFile();
  type FishAge = number;
  const fish: Record<FishAge, number> = {};

  const data = fs.readFileSync(inputFile, 'utf8');
  const parsedData = data.toString().split(',');
  for (const i in parsedData) {
    if (parsedData[i] === '') {
      continue;
    }
    const age = Number(parsedData[i]);
    if (fish[age] === undefined) {
      fish[age] = 0;
    }
    fish[age] = fish[age] + 1;
  }

  return fish;
}

async function doTheFish(fish: number, days: number, totalDays: number): Promise<number[]> {
  const thisFishPopulation = [];
  const promises = [];
  // console.debug(`Day: ${totalDays - days}, Age 0: ${fish} (init)`);
  for (let day = days; day > 0; day--) {
    if (fish === 0) {
      fish = 6;
      // console.debug(`        Spawn a 8 on day ${days - day}, so it will show up on day ${days - day + 1}`);
      const results = doTheFish(8, day - 1, totalDays);
      promises.push(results);
    } else {
      fish--;
    }
    // console.debug(`Day: ${totalDays - day + 1}, Age ${days - day + 1}: ${fish} (after)`);
  }
  const newFishes = await Promise.all(promises);
  for (const newFish of newFishes) {
    thisFishPopulation.push(newFish[0]);
  }
  thisFishPopulation.push(fish);
  return thisFishPopulation;
}

function countFish(fish: Record<number, number>): number {
  let count = 0;
  for (const f in fish) {
    count = count + fish[f];
  }
  return count;
}

export async function main(): Promise<void> {
  const population = getPopulation();

  const days = 256;
  // const days = 80;

  const startCount = countFish(population);
  let finalFish = population;
  for (let day = 0; day < days; day++) {
    const newFish: Record<number, number> = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
    };
    // console.log(`============================== ${day}`);
    // console.log(finalFish);
    for (let age = 0; age < 9; age++) {
      const populationOfAge = finalFish[age] === undefined ? 0 : Number(finalFish[age]);
      // console.log(`Age ${age}`);
      if (age === 0) {
        newFish[6] = newFish[6] + populationOfAge;
        newFish[8] = newFish[8] + populationOfAge;
        // console.log(`    Adding to 6 = ${newFish[6]} + ${populationOfAge}`);
        // console.log(`    Adding to 8 = ${newFish[8]} + ${populationOfAge}`);
      } else {
        const newAge = age - 1;
        newFish[newAge] = newFish[newAge] + populationOfAge;
        // console.log(`    Adding to ${newAge} = ${newFish[newAge]} + ${populationOfAge}`);
      }
    }
    finalFish = newFish;
  }
  // console.log('================================ DONE');
  // console.log(finalFish);
  const endCount = countFish(finalFish);

  console.log(`We started with ${startCount} lanternfish at day 0`);
  console.log(`Number of lanternfish after ${days} days: ${endCount}`);
}
