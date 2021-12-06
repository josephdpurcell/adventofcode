import { getPopulation } from './part1';

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

export async function main(): Promise<void> {
  const promises = [];
  const population = getPopulation();

  const days = 256;
  // const days = 10;
  const startCount = population.getFishCount();
  for (const fish of population.getFish()) {
    promises.push(doTheFish(fish, days, days));
  }
  const finalPopulation = population.getFish();
  const results = await Promise.all(promises);
  console.log(results);
  for (const result of results) {
    for (const f of result) {
      finalPopulation.push(f);
    }
  }
  const endCount = finalPopulation.length;

  console.log(`We started with ${startCount} lanternfish at day 0`);
  console.log(`Number of lanternfish after ${days} days: ${endCount}`);
}
