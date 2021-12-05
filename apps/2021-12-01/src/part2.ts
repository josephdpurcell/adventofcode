import * as fs from 'fs';
import * as os from 'os';

function getInputFile(): string {
  const homedir = os.homedir();
  const inputFile = homedir + '/src/github.com/josephdpurcell/adventofcode/apps/2021-12-01/src/input.txt';
  return inputFile;
}

export function part2(): void {
  const inputFile = getInputFile();

  fs.readFile(inputFile, 'utf8', (err, data) => {
    const parsedData = data.toString().split('\n');

    const previous = [];
    const current = [];
    let count = 0;
    let iteration = 0;
    for (const i in parsedData) {
      iteration++;
      const inputLine = parsedData[i];
      if (inputLine === '') {
        continue;
      }
      const depth = Number(inputLine);
      // console.debug(depth);

      // Initialize.
      if (iteration === 1) {
        previous.push(depth);
        continue;
      }
      if (iteration === 2 || iteration === 3) {
        current.push(depth);
        previous.push(depth);
        continue;
      }
      if (iteration === 4) {
        current.push(depth);
      }
      if (iteration > 4) {
        previous.shift();
        previous.push(current[2]);

        current.shift();
        current.push(depth);
      }

      // console.debug({ previous, current });

      const previousTotal = previous.reduce((sum, value) => sum + value);
      const currentTotal = current.reduce((sum, value) => sum + value);
      // console.debug({ previousTotal, currentTotal });
      if (currentTotal > previousTotal) {
        // console.debug('            increased!');
        count++;
      }
    }

    console.log(`Increased: ${count}`);
  });
}
