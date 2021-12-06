import * as fs from 'fs';
import * as os from 'os';

function getInputFile(): string {
  const homedir = os.homedir();
  const inputFile = homedir + '/src/github.com/josephdpurcell/adventofcode/apps/2021-12-06/src/input-truncated.txt';
  return inputFile;
}

class LanternfishPopulation {
  protected day = 0;
  protected fish: number[] = [];

  populate(fish: number): void {
    this.fish.push(fish);
  }

  populateMany(fish: number[]): void {
    for (const f of fish) {
      this.populate(f);
    }
  }

  live(): void {
    const newFish = [];
    for (const i in this.fish) {
      if (this.fish[i] === 0) {
        this.fish[i] = 6;
        newFish.push(8);
      } else {
        this.fish[i]--;
      }
    }
    for (const f of newFish) {
      this.fish.push(f);
    }
    this.day = this.day + 1;
  }

  getFish(): number[] {
    return this.fish;
  }

  getDays(): number {
    return this.day;
  }

  getFishCount(): number {
    return this.fish.length;
  }
}

export function getPopulation(): LanternfishPopulation {
  const inputFile = getInputFile();

  const data = fs.readFileSync(inputFile, 'utf8');

  const population = new LanternfishPopulation();

  const parsedData = data.toString().split(',');
  for (const i in parsedData) {
    const age = parsedData[i];
    if (age === '') {
      continue;
    }
    population.populate(Number(age));
  }

  return population;
}

export function main(): void {
  const population = getPopulation();

  const days = 80;
  const startCount = population.getFishCount();
  // console.debug(population);
  for (let i = 0; i < days; i++) {
    population.live();
    // console.debug(population);
  }
  const endCount = population.getFishCount();

  console.log(`We started with ${startCount} lanternfish at day 0`);
  console.log(`Number of lanternfish after ${days} days: ${endCount}`);
}
