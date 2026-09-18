import type { Operation } from './types';

/* Iga tehte punktiväärtus tema raskuse järgi (tehe × raskusaste). Baas
   liitmine tasemel 100 = 1 punkt. Väärtused on kalibreeritud käsitsi
   (kasutaja hinnang, mitte mõõdetud andmed) ja neid saab hiljem päris
   lahendusaegade põhjal täpsustada. */

const DIFFICULTY_LEVELS = [100, 500, 1000, 10000, 100000] as const;

const OPERATION_POINTS: Record<Operation, number[]> = {
  add: [1, 2, 3, 4, 5],
  sub: [2, 3, 4, 5, 6],
  mul: [1, 3, 6, 9, 12],
  div: [2, 5, 8, 11, 14],
};

export function getPointValue(operation: Operation, max: number): number {
  const levelIndex = DIFFICULTY_LEVELS.indexOf(max as (typeof DIFFICULTY_LEVELS)[number]);
  return OPERATION_POINTS[operation][levelIndex];
}

export function getPointsPerMinute(totalPoints: number, elapsedMs: number): number {
  const minutes = elapsedMs / 60000;
  return minutes > 0 ? totalPoints / minutes : 0;
}
