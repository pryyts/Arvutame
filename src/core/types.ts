export type Operation = 'add' | 'sub' | 'mul' | 'div';

export type Mode =
  | { type: 'count'; count: number }
  | { type: 'timed'; seconds: number };

export interface Settings {
  ops: Operation[];
  max: number;
  mode: Mode;
}

export interface Problem {
  a: number;
  b: number;
  opSymbol: string;
  answer: number;
}

export interface SessionResult {
  correct: number;
  wrong: number;
  elapsedMs: number;
}
