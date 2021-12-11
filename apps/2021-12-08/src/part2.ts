import { get } from './part1';

class Dictionary {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
}
const dictionary: Dictionary = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e',
  f: 'f',
  g: 'g',
};

const digitToString: Record<number, string> = {
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

const stringToDigit: Record<string, number> = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
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

function getDict(signalPattern: string[]): any {
  const dict = {};
  for (const i in signalPattern) {
    const signalString = signalPattern[i];
    const signalLen = signalString.length;
    if (signalLen === 2) {
      // Digit is 1
      // cf
      dict['c'] = signalString[0];
      dict['f'] = signalString[1];
      console.log(`    Found a 2 ${signalString}: c = ${dict['c']}, f = ${dict['f']}`);
    } else if (signalLen === 4) {
      // Digit is 4
      // bcdf
      dict['b'] = signalString[0];
      dict['c'] = signalString[1];
      dict['d'] = signalString[2];
      dict['f'] = signalString[3];
      console.log(
        `    Found a 4 ${signalString}: b = ${dict['b']}, c = ${dict['c']}, d = ${dict['d']}, f = ${dict['f']}`,
      );
    } else if (signalLen === 3) {
      // Digit is 7
      // acf
      dict['a'] = signalString[0];
      dict['c'] = signalString[1];
      dict['f'] = signalString[2];
      console.log(`    Found a 7 ${signalString}: a = ${dict['a']}, c = ${dict['c']}, f = ${dict['f']}`);
    } else if (signalLen === 7) {
      // Digit is 8
      // abcdefg
      dict['a'] = signalString[0];
      dict['b'] = signalString[1];
      dict['c'] = signalString[2];
      dict['d'] = signalString[3];
      dict['e'] = signalString[4];
      dict['f'] = signalString[5];
      dict['g'] = signalString[6];
      console.log(
        `    Found a 8 ${signalString}: a = ${dict['a']}, b = ${dict['b']}, c = ${dict['c']}, d = ${dict['d']}, e = ${dict['e']}, f = ${dict['f']}`,
      );
    }
  }
  return dict;
}

export function main(): void {
  const signals = get();

  for (const signal of signals) {
    // The dictionary is wrong....??
    // digits 2 and 4 are setting a "f" to different characters
    console.log(`Creating dict from ${signal.signalPattern.join(',')}`);
    const dict = getDict(signal.signalPattern);
    console.log(`    ${JSON.stringify(dict)}`);

    return;
    const newDigitToString: Record<number, string> = {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
    };
    for (const i in newDigitToString) {
      for (let j = 0; j < digitToString[i].length; j++) {
        const char = digitToString[i].charAt(j);
        newDigitToString[i] = newDigitToString[i] + dict[char];
      }
      // console.log(`--------------- ${newDigitToString[i]} =` + newDigitToString[i].split('').sort((one, two) => (one < two ? -1 : 1)));
      // const sortedString = newDigitToString[i].split('').sort((one, two) => (one < two ? -1 : 1));
      newDigitToString[i] = newDigitToString[i]
        .split('')
        .sort((one, two) => (one < two ? -1 : 1))
        .join('');
      console.log(`      ${i} was ${digitToString[i]} but is now ${newDigitToString[i]}`);
    }
    const newStringToDigit: Record<string, number> = {};
    Object.keys(newDigitToString).forEach((key) => {
      newStringToDigit[newDigitToString[key]] = Number(key);
    });
    console.log(newStringToDigit);

    console.log(`             Now converting ${signal.outputValues.join(',')}`);
    // let outputDigits = '';
    for (const i in signal.outputValues) {
      const outputDigitString = signal.outputValues[i]
        .split('')
        .sort((one, two) => (one < two ? -1 : 1))
        .join('');

      console.log(`                 ${outputDigitString} = ${newStringToDigit[outputDigitString]}`);
    }
  }
}
