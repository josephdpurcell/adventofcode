import { part1 } from './part1';
import { part2 } from './part2';

const args = process.argv.slice(2);
if (!args[0]) {
  throw new Error('You must pass "part1" or "part2" as an argument');
}

const part = args[0];
if (part === 'part1') {
  part1();
} else if (part === 'part2') {
  part2();
} else {
  throw new Error('Part must be "part1" or "part2"');
}
