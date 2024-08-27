'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types';
import { questions } from '../data/questions';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const [timerDuration, setTimerDuration] = useState<number>(30);
  const [remainingTime, setRemainingTime] = useState<number>(timerDuration);
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);

  // Initialize with a random question on the client side (causes slight delay, need to move this logic to server side)
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setUsedQuestionIds([questions[randomIndex].id]);
  }, []);

  const getNextQuestion = useCallback(() => {
    let availableQuestions = questions.filter(q => !usedQuestionIds.includes(q.id));
    if (availableQuestions.length === 0) {
      setUsedQuestionIds([]);
      availableQuestions = questions;
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const nextQuestion = availableQuestions[randomIndex];
    setCurrentQuestion(nextQuestion);
    setUsedQuestionIds(prev => [...prev, nextQuestion.id]);
    setRemainingTime(timerDuration);
  }, [usedQuestionIds, timerDuration]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          getNextQuestion();
          return timerDuration;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [getNextQuestion, timerDuration]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        getNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [getNextQuestion]);

  const handleTimerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(event.target.value, 10);
    setTimerDuration(newDuration);
    setRemainingTime(newDuration);
  };

  return (
    <div className="container">
      <main>
        <h1>Med School Interview Questions</h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="question-container"
          >
            <h2 onClick={getNextQuestion}>{currentQuestion.text}</h2>
            <h3>Topic: {currentQuestion.topic}</h3>
            <motion.div
              className="timer"
              initial={{ width: '100%' }}
              animate={{ width: `${(remainingTime / timerDuration) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="timer-input">
          <label htmlFor="timer-duration">Timer duration: {timerDuration} seconds</label>
          <input
            id="timer-duration"
            type="range"
            min="15"
            max="90"
            value={timerDuration}
            onChange={handleTimerChange}
          />
        </div>
        <p>Hit space or click on the question to go to the next one</p>
      </main>
    </div>
  );
}