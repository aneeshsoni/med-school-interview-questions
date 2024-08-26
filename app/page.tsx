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
    <div className="container" onClick={getNextQuestion}>
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
            <h2>{currentQuestion.text}</h2>
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
        <p>Press space or click anywhere to go to the next question</p>
      </main>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html, body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        .container {
          min-height: 100vh;
          min-width: 100vw;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f5f5f5;
        }
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 2rem;
          color: #333;
          text-align: center;
        }
        .timer-input {
          margin-bottom: 2rem;
          font-size: 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .timer-input label {
          margin-bottom: 0.5rem;
          color: #333;
        }
        .timer-input input {
          width: 300px;
        }
        .question-container {
          background-color: white;
          border-radius: 15px;
          padding: 3rem;
          margin-bottom: 2rem;
          text-align: center;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        h3 {
          font-size: 2 rem;
          line-height: 1.2;
          margin-bottom: 2rem;
          color: #444;
        }
        h2 {
          font-size: 3.5rem;
          line-height: 1.2;
          margin-bottom: 2rem;
          color: #444;
        }
        .timer {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 8px;
          background-color: #4CAF50;
        }
        p {
          font-size: 1.5rem;
          color: #666;
          text-align: center;
        }
      `}</style>
    </div>
  );
}