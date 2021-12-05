/**
 * Just having fun writing very poor code. This one is about the journey, not
 * the quality of the result. A good result requires a refactor once I know the
 * "shape" of what I'm building, which I probably wont' take the time to go back
 * and refactor.
 */
import * as fs from 'fs';
import * as os from 'os';

const lines = [];

function getOccurrences(lines: string[]): any {
  const occurrences = {
    1: { 0: 0, 1: 0 },
    2: { 0: 0, 1: 0 },
    3: { 0: 0, 1: 0 },
    4: { 0: 0, 1: 0 },
    5: { 0: 0, 1: 0 },
    6: { 0: 0, 1: 0 },
    7: { 0: 0, 1: 0 },
    8: { 0: 0, 1: 0 },
    9: { 0: 0, 1: 0 },
    10: { 0: 0, 1: 0 },
    11: { 0: 0, 1: 0 },
    12: { 0: 0, 1: 0 },
  };
  for (const i in lines) {
    const line = lines[i];
    if (line === '') {
      continue;
    }

    occurrences[1][line[0]] = occurrences[1][line[0]] + 1;
    occurrences[2][line[1]] = occurrences[2][line[1]] + 1;
    occurrences[3][line[2]] = occurrences[3][line[2]] + 1;
    occurrences[4][line[3]] = occurrences[4][line[3]] + 1;
    occurrences[5][line[4]] = occurrences[5][line[4]] + 1;
    occurrences[6][line[5]] = occurrences[6][line[5]] + 1;
    occurrences[7][line[6]] = occurrences[7][line[6]] + 1;
    occurrences[8][line[7]] = occurrences[8][line[7]] + 1;
    occurrences[9][line[8]] = occurrences[9][line[8]] + 1;
    occurrences[10][line[9]] = occurrences[10][line[9]] + 1;
    occurrences[11][line[10]] = occurrences[11][line[10]] + 1;
    occurrences[12][line[11]] = occurrences[12][line[11]] + 1;
  }
  return occurrences;
}

function getLinesForOxygenRating(bit: number, lines: string[]): string[] {
  const mostPopularLines = [];
  const occurrences = getOccurrences(lines);
  const key = bit - 1;
  const imSoPopular = occurrences[bit][0] > occurrences[bit][1] ? 0 : 1;
  for (const line of lines) {
    if (Number(line[key]) === imSoPopular) {
      mostPopularLines.push(line);
    }
  }
  return mostPopularLines;
}

function getLinesForC02Rating(bit: number, lines: string[]): string[] {
  const mostPopularLines = [];
  const occurrences = getOccurrences(lines);
  const key = bit - 1;
  const imSoPopular = occurrences[bit][0] > occurrences[bit][1] ? 1 : 0;
  for (const line of lines) {
    if (Number(line[key]) === imSoPopular) {
      mostPopularLines.push(line);
    }
  }
  return mostPopularLines;
}

function oxygenReducer(bit: number, lines: string[]): string {
  const popularLines = getLinesForOxygenRating(bit, lines);

  if (popularLines.length > 1) {
    return oxygenReducer(bit + 1, popularLines);
  }
  return popularLines[0];
}

function c02Reducer(bit: number, lines: string[]): string {
  const popularLines = getLinesForC02Rating(bit, lines);
  if (popularLines.length > 1) {
    return c02Reducer(bit + 1, popularLines);
  }
  return popularLines[0];
}

export function part2(): void {
  const homedir = os.homedir();
  const inputFile = homedir + '/src/github.com/josephdpurcell/adventofcode/apps/2021-12-03/src/day-3-input.txt';

  fs.readFile(inputFile, 'utf8', (err, data) => {
    const parsedData = data.toString().split('\n');
    for (const i in parsedData) {
      const line = parsedData[i];
      if (line === '') {
        continue;
      }
      lines.push(line);
    }

    const oxygenGeneratorRatingBinary = oxygenReducer(1, lines);
    const oxygenGeneratorRating = parseInt(oxygenGeneratorRatingBinary, 2);

    const c02ScrubberRatingBinary = c02Reducer(1, lines);
    const c02ScrubberRating = parseInt(c02ScrubberRatingBinary, 2);

    console.log(`Oxygen Generator Rating: ${oxygenGeneratorRating} (${oxygenGeneratorRatingBinary})`);
    console.log(`C02 Scrubber Rating: ${c02ScrubberRating} (${c02ScrubberRatingBinary})`);
    console.log(`Life Support Rating: ${oxygenGeneratorRating * c02ScrubberRating}`);
  });
}
