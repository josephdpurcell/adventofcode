import * as fs from 'fs';
import * as os from 'os';

function getInputFile(): string {
  const homedir = os.homedir();
  const inputFile = homedir + '/src/github.com/josephdpurcell/adventofcode/apps/2021-12-01/src/input.txt';
  return inputFile;
}

export function part1(): void {
  const inputFile = getInputFile();

  fs.readFile(inputFile, 'utf8', (err, data) => {
    const parsedData = data.toString().split('\n');

    let previous = undefined;
    let count = 0;
    for (const i in parsedData) {
      const inputLine = parsedData[i];
      if (inputLine === '') {
        continue;
      }
      if (previous !== undefined && Number(inputLine) > previous) {
        count++;
      }
      previous = Number(inputLine);
    }

    console.log(`Times icreased: ${count}`);
  });
}
