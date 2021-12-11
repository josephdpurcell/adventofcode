import * as fs from 'fs';
import * as os from 'os';

const digitStrings = {
  0: 'abcefg',
  1: 'cf',
  2: 'acdeg',
  3: 'acdfg',
  4: 'bcdf',
  5: 'abdfg',
  6: 'abdefg',
  7: 'acf',
  8: 'abcdefg',
  9: 'abcdfg',
};

// 1, 4, 7, 8 are unique
// their values are 2, 4, 3, 7
const digitCounts = {
  0: 6,
  1: 2, // unique
  2: 5,
  3: 5,
  4: 4, // unique
  5: 5,
  6: 6,
  7: 3, // unique
  8: 7, // unique
  9: 6,
};

export function getInputFile(): string {
  const homedir = os.homedir();
  const inputFile = homedir + '/src/github.com/josephdpurcell/adventofcode/apps/2021-12-08/src/input.txt';
  return inputFile;
}

class Pattern {
  // 10 digits
  signalPattern: string[];
  // 4 digits
  outputValues: string[];
}

export function get(): Pattern[] {
  const inputFile = getInputFile();

  const signals: Pattern[] = [];
  const data = fs.readFileSync(inputFile, 'utf8');

  const parsedData = data.toString().split('\n');
  console.log(parsedData);
  for (const i in parsedData) {
    const line = parsedData[i].trim();
    if (line === '') {
      continue;
    }
    const parts = line.split('|');
    signals.push({
      signalPattern: parts[0].trim().split(' '),
      outputValues: parts[1].trim().split(' '),
    });
    // signals.signalPattern.push(parts[0].trim().split(' '));
    // signals.outputValues.push(parts[1].trim().split(' '));
  }

  return signals;
}

export function main(): void {
  const signals = get();

  const uniqueNumbers = [2, 4, 3, 7];
  const counts: Record<2 | 4 | 3 | 7, number> = {
    '2': 0,
    '4': 0,
    '3': 0,
    '7': 0,
  };
  for (const signal of signals) {
    console.log(`Checking ${signal.outputValues.join(',')}`);
    for (const i in signal.outputValues) {
      const signalLen = signal.outputValues[i].length;
      if (uniqueNumbers.indexOf(signalLen) !== -1) {
        counts[signalLen] = counts[signalLen] + 1;
        console.log(`    Adding ${signalLen}`);
      }
    }
  }
  // console.log(signals);
  console.log(counts);
  let total = 0;
  for (const i in counts) {
    total = total + counts[i];
  }
  console.log(`TOTAL: ${total}`);
}
