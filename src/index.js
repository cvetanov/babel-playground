import * as babylon from 'babylon';

const code = `function square(x) {
  return x * x;
}`;

const parsed = babylon.parse(code);
console.log(parsed);
console.log('abc');