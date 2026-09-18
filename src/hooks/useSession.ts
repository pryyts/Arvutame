import { useEffect, useRef, useState } from 'react';
import { generateProblem } from '../core/problemGenerator';
import type { Problem, Settings } from '../core/types';

export type Screen = 'settings' | 'practice' | 'results';

const WRONG_ANSWER_PAUSE_MS = 1200;

export function useSession() {
  const [screen, setScreen] = useState<Screen>('settings');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [correctHint, setCorrectHint] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  const settingsRef = useRef<Settings | null>(null);
  const problemRef = useRef<Problem | null>(null);
  const indexRef = useRef(0);
  const correctRef = useRef(0);
  const wrongRef = useRef(0);
  const timeLeftRef = useRef(0);
  const startTimeRef = useRef(0);
  const activeRef = useRef(false);
  const awaitingNextRef = useRef(false);
  const timerIntervalRef = useRef<number | null>(null);
  const advanceTimeoutRef = useRef<number | null>(null);

  function clearTimers() {
    if (timerIntervalRef.current !== null) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (advanceTimeoutRef.current !== null) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
  }

  useEffect(() => clearTimers, []);

  function nextProblem() {
    const p = generateProblem(settingsRef.current!.ops, settingsRef.current!.max);
    problemRef.current = p;
    setProblem(p);
    setIsWrong(false);
    setCorrectHint('');
    setInputDisabled(false);
    awaitingNextRef.current = false;
  }

  function endSession() {
    activeRef.current = false;
    clearTimers();
    setElapsedMs(Date.now() - startTimeRef.current);
    setScreen('results');
  }

  function advance() {
    indexRef.current += 1;
    setIndex(indexRef.current);
    const s = settingsRef.current!;
    if (s.mode.type === 'count' && indexRef.current >= s.mode.count) {
      endSession();
      return;
    }
    nextProblem();
  }

  function start(newSettings: Settings) {
    settingsRef.current = newSettings;
    setSettings(newSettings);
    indexRef.current = 0;
    correctRef.current = 0;
    wrongRef.current = 0;
    setIndex(0);
    setCorrect(0);
    setWrong(0);
    startTimeRef.current = Date.now();
    activeRef.current = true;
    awaitingNextRef.current = false;

    if (newSettings.mode.type === 'timed') {
      timeLeftRef.current = newSettings.mode.seconds;
      setTimeLeft(timeLeftRef.current);
      timerIntervalRef.current = window.setInterval(() => {
        timeLeftRef.current -= 1;
        setTimeLeft(timeLeftRef.current);
        if (timeLeftRef.current <= 0) endSession();
      }, 1000);
    }

    setScreen('practice');
    nextProblem();
  }

  function submit(raw: string) {
    if (!activeRef.current || awaitingNextRef.current) return;
    if (raw.trim() === '') return;

    const isCorrect = Number(raw) === problemRef.current!.answer;
    if (isCorrect) {
      correctRef.current += 1;
      setCorrect(correctRef.current);
      advance();
    } else {
      wrongRef.current += 1;
      setWrong(wrongRef.current);
      setIsWrong(true);
      setCorrectHint(`Õige vastus: ${problemRef.current!.answer}`);
      setInputDisabled(true);
      awaitingNextRef.current = true;
      advanceTimeoutRef.current = window.setTimeout(advance, WRONG_ANSWER_PAUSE_MS);
    }
  }

  function cancel() {
    activeRef.current = false;
    clearTimers();
    setScreen('settings');
  }

  function restart() {
    setScreen('settings');
  }

  return {
    screen,
    settings,
    problem,
    index,
    correct,
    wrong,
    timeLeft,
    isWrong,
    correctHint,
    inputDisabled,
    elapsedMs,
    start,
    submit,
    cancel,
    restart,
  };
}
