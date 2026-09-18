import type { Operation, Problem } from './types';

/* Põhimõte: raskusaste piirab suurimat tehtes nähtavat arvu (mitte kunagi
   tegureid juhuslikult valides lootust, et tulemus jääb piiresse). */

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAddition(max: number): Problem {
  const result = randInt(2, max);
  const a = randInt(1, result - 1);
  const b = result - a;
  return { a, b, opSymbol: '+', answer: result };
}

function generateSubtraction(max: number): Problem {
  const minuend = randInt(2, max);
  const subtrahend = randInt(1, minuend - 1);
  return { a: minuend, b: subtrahend, opSymbol: '−', answer: minuend - subtrahend };
}

function generateMultiplication(max: number): Problem {
  const aMax = Math.max(2, Math.min(12, Math.floor(max / 2)));
  const a = randInt(2, aMax);
  const bMax = Math.max(2, Math.floor(max / a));
  const b = randInt(2, bMax);
  return { a, b, opSymbol: '×', answer: a * b };
}

function generateDivision(max: number): Problem {
  const divisor = randInt(2, 12);
  const quotientMax = Math.max(1, Math.floor(max / divisor));
  const quotient = randInt(1, quotientMax);
  const dividend = divisor * quotient;
  return { a: dividend, b: divisor, opSymbol: '÷', answer: quotient };
}

const GENERATORS: Record<Operation, (max: number) => Problem> = {
  add: generateAddition,
  sub: generateSubtraction,
  mul: generateMultiplication,
  div: generateDivision,
};

export function generateProblem(ops: Operation[], max: number): Problem {
  const op = ops[randInt(0, ops.length - 1)];
  return GENERATORS[op](max);
}
