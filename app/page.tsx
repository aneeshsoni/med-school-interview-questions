'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types';
import { questions } from '../data/questions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Play, SkipForward, Heart, Filter, X } from 'lucide-react';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const [timerDuration, setTimerDuration] = useState<number>(30);
  const [remainingTime, setRemainingTime] = useState<number>(timerDuration);
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Get unique categories from questions
  const categories = Array.from(new Set(questions.map(q => q.topic))).sort();

  // Initialize with all categories selected
  useEffect(() => {
    setSelectedCategories(categories);
  }, []);

  // Get filtered questions based on selected categories
  const filteredQuestions = questions.filter(q => selectedCategories.includes(q.topic));

  // Initialize with a random question from filtered questions
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
      setCurrentQuestion(filteredQuestions[randomIndex]);
      setUsedQuestionIds([filteredQuestions[randomIndex].id]);
    }
  }, [selectedCategories]);

  const getNextQuestion = useCallback(() => {
    if (filteredQuestions.length === 0) return;

    let availableQuestions = filteredQuestions.filter(q => !usedQuestionIds.includes(q.id));
    if (availableQuestions.length === 0) {
      setUsedQuestionIds([]);
      availableQuestions = filteredQuestions;
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const nextQuestion = availableQuestions[randomIndex];
    setCurrentQuestion(nextQuestion);
    setUsedQuestionIds(prev => [...prev, nextQuestion.id]);
    setRemainingTime(timerDuration);
  }, [filteredQuestions, usedQuestionIds, timerDuration]);

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
        event.preventDefault();
        getNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [getNextQuestion]);

  const handleTimerChange = (value: number[]) => {
    const newDuration = value[0];
    setTimerDuration(newDuration);
    setRemainingTime(newDuration);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const selectAllCategories = () => {
    setSelectedCategories(categories);
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const router = useRouter();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((timerDuration - remainingTime) / timerDuration) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Med School Interview Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Practice with confidence • Master your responses
          </p>
        </motion.div>

        {/* Question Card - Now the main focus */}
        <AnimatePresence mode="wait">
          {filteredQuestions.length > 0 ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-8"
            >
              <Card
                className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={getNextQuestion}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {currentQuestion.topic}
                    </Badge>
                    <SkipForward className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <CardTitle className="text-2xl md:text-3xl font-semibold leading-relaxed text-gray-800 dark:text-gray-200 text-center group-hover:text-blue-600 transition-colors">
                    {currentQuestion.text}
                  </CardTitle>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <div className="text-muted-foreground mb-4">
                    <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No Questions Available</h3>
                    <p>Please select at least one category to start practicing.</p>
                  </div>
                  <Button
                    onClick={() => setShowFilters(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Select Categories
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Play className="h-4 w-4" />
            <span className="text-sm">
              Press <kbd className="px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-800 rounded border">Space</kbd> or click the question to continue
            </span>
          </div>
        </motion.div>

        {/* Controls Section - More subtle positioning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          {/* Timer Controls */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-sm">
                    {formatTime(remainingTime)}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {usedQuestionIds.length} / {filteredQuestions.length}
                </Badge>
              </div>

              <Progress
                value={progressPercentage}
                className="h-1.5 mb-3"
              />

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Timer: {timerDuration}s
                </label>
                <Slider
                  value={[timerDuration]}
                  onValueChange={handleTimerChange}
                  max={90}
                  min={15}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>15s</span>
                  <span>90s</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Filter */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-sm">Categories</span>
                  <Badge variant="secondary" className="text-xs">
                    {selectedCategories.length} / {categories.length}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-muted-foreground hover:text-foreground h-6 px-2"
                >
                  {showFilters ? <X className="h-3 w-3" /> : <Filter className="h-3 w-3" />}
                </Button>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex gap-2 mb-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={selectAllCategories}
                        className="text-xs h-6 px-2"
                      >
                        Select All
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAllCategories}
                        className="text-xs h-6 px-2"
                      >
                        Clear All
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {categories.map((category) => (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <label
                            htmlFor={category}
                            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {category}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={() => router.push('/donate')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <Heart className="h-4 w-4 mr-2" />
            Support This Project
          </Button>
        </motion.footer>
      </div>
    </div>
  );
}
