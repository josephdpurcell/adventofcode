/**
 * WOW this is poorly written. Sooo procedural.
 */
import * as fs from 'fs';
import * as os from 'os';

export function part1(): void {
  const homedir = os.homedir();
  const inputFile =
    homedir +
    '/src/github.com/josephdpurcell/adventofcode/apps/2021-12-03/src/day-3-input.txt';

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
    12: { 0: 0, 1: 0 }
  };
  const alphaRate = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0
  };
  const gammaRate = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0
  };

  function getGammaRate(occurrence: { 0: number; 1: number }): number {
    if (occurrence[0] > occurrence[1]) {
      return 0;
    }
    return 1;
  }

  function getAlphaRate(occurrence: { 0: number; 1: number }): number {
    if (occurrence[0] > occurrence[1]) {
      return 1;
    }
    return 0;
  }

  fs.readFile(inputFile, 'utf8', (err, data) => {
    const parsedData = data.toString().split('\n');
    for (const i in parsedData) {
      const line = parsedData[i];
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

    console.log('Occurrences:');
    console.log(occurrences);

    gammaRate[1] = getGammaRate(occurrences[1]);
    alphaRate[1] = getAlphaRate(occurrences[1]);

    gammaRate[2] = getGammaRate(occurrences[2]);
    alphaRate[2] = getAlphaRate(occurrences[2]);

    gammaRate[3] = getGammaRate(occurrences[3]);
    alphaRate[3] = getAlphaRate(occurrences[3]);

    gammaRate[4] = getGammaRate(occurrences[4]);
    alphaRate[4] = getAlphaRate(occurrences[4]);

    gammaRate[5] = getGammaRate(occurrences[5]);
    alphaRate[5] = getAlphaRate(occurrences[5]);

    gammaRate[6] = getGammaRate(occurrences[6]);
    alphaRate[6] = getAlphaRate(occurrences[6]);

    gammaRate[7] = getGammaRate(occurrences[7]);
    alphaRate[7] = getAlphaRate(occurrences[7]);

    gammaRate[8] = getGammaRate(occurrences[8]);
    alphaRate[8] = getAlphaRate(occurrences[8]);

    gammaRate[9] = getGammaRate(occurrences[9]);
    alphaRate[9] = getAlphaRate(occurrences[9]);

    gammaRate[10] = getGammaRate(occurrences[10]);
    alphaRate[10] = getAlphaRate(occurrences[10]);

    gammaRate[11] = getGammaRate(occurrences[11]);
    alphaRate[11] = getAlphaRate(occurrences[11]);

    gammaRate[12] = getGammaRate(occurrences[12]);
    alphaRate[12] = getAlphaRate(occurrences[12]);

    const gammaRateString = Object.values(gammaRate).join('');
    const alphaRateString = Object.values(alphaRate).join('');
    console.log('Gamma Rate binary: ' + gammaRateString);
    console.log('Alpha Rate binary: ' + alphaRateString);
    console.log('Gamma Rate: ' + parseInt(gammaRateString, 2));
    console.log('Alpha Rate: ' + parseInt(alphaRateString, 2));
    console.log(
      'Power Consumption: ' +
        parseInt(gammaRateString, 2) * parseInt(alphaRateString, 2)
    );
  });
}
