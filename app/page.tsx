'use client';

import { useState, useEffect, useCallback } from 'react';
import { Question } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const questions: Question[] = [
  { id: 1, topic: "Personal", text: "Tell me about yourself" },
  { id: 2, topic: "Personal", text: "How do you want me to remember you?" },
  { id: 3, topic: "Personal", text: "What are your goals?" },
  { id: 4, topic: "Personal", text: "Why should we choose you?" },
  { id: 5, topic: "Personal", text: "Why would you make a good doctor?" },
  { id: 6, topic: "Personal", text: "Why medicine?" },
  { id: 7, topic: "Personal", text: "What do you expect 10 years from now?" },
  { id: 8, topic: "Personal", text: "Why our school?" },
  { id: 9, topic: "Personal", text: "What if you're not accepted?" },
  { id: 10, topic: "Personal", text: "Do you have any questions for me or us?" },
  { id: 11, topic: "Academic", text: "Why did you choose your major?" },
  { id: 12, topic: "Academic", text: "What is your favorite subject?" },
  { id: 13, topic: "Academic", text: "Do you think you can cope with the workload?" },
  { id: 14, topic: "Academic", text: "How do you prepare for exams?" },
  { id: 15, topic: "Academic", text: "Do you engage in self-directed learning?" },
  { id: 16, topic: "Social", text: "Can you describe a leadership role you've taken up?" },
  { id: 17, topic: "Social", text: "Have you done any volunteer work?" },
  { id: 18, topic: "Personality", text: "How do you handle stress?" },
  { id: 19, topic: "Personality", text: "What was the most stressful event?" },
  { id: 20, topic: "Personality", text: "If you could change one thing about you" },
  { id: 21, topic: "Personality", text: "How would your friends describe you?" },
  { id: 22, topic: "Personality", text: "What do you do with your spare time?" },
  { id: 23, topic: "Personality", text: "Most important event in past 5 years?" },
  { id: 24, topic: "Personality", text: "If you had 3 magical wishes what would they be?" },
  { id: 25, topic: "Personality", text: "What would you do on a perfect day?" },
  { id: 26, topic: "Personality", text: "What are your strengths?" },
  { id: 27, topic: "Personality", text: "What are your greatest weakness?" },
  { id: 28, topic: "Medcine-Related", text: "Pros/cons of healthcare system?" },
  { id: 29, topic: "Medcine-Related", text: "What changes would you make?" },
  { id: 30, topic: "Medcine-Related", text: "Do doctors make too much money?" },
  { id: 31, topic: "Medcine-Related", text: "What is the Hippocratic Oath?" },
  { id: 32, topic: "Medcine-Related", text: "Medicare vs Medicaid?" },
  { id: 33, topic: "Ethics & Problem Solving Scenarios", text: "What would you do if an underage girl asks for the pill?" },
  { id: 34, topic: "Ethics & Problem Solving Scenarios", text: "Transfusion for Jehovah Witness" },
  { id: 35, topic: "Ethics & Problem Solving Scenarios", text: "What if an immediate relative has a heart attack before a final exam?" },
  { id: 36, topic: "Ethics & Problem Solving Scenarios", text: "How would you inform a patient about cancer?" },
  { id: 37, topic: "Ethics & Problem Solving Scenarios", text: "Man with AIDs doesnt want to tell his wife" },
  { id: 38, topic: "Ethics & Problem Solving Scenarios", text: "Ball hits friends eye while playing tennis" },
  { id: 39, topic: "Ethics & Problem Solving Scenarios", text: "Suppose you're taking a final exam and notice cheating. What would you do?" },
];

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