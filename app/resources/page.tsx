'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Play, BookOpen, FileText, Users, Star, Clock, TrendingUp } from 'lucide-react';

export default function Resources() {
    const router = useRouter();

    const resources = [
        {
            category: "YouTube Channels",
            items: [
                {
                    title: "Dr. Gray's Medical School Interivew Prep",
                    description: "Comprehensive interview prep with real examples and common pitfalls",
                    url: "https://www.youtube.com/@MedicalSchoolHQ",
                    type: "video",
                    duration: "Multiple videos",
                    tags: ["Interview Prep", "Common Questions", "Body Language"]
                },
                {
                    title: "Med School Insiders",
                    description: "Step-by-step interview strategies and mock interviews",
                    url: "https://www.youtube.com/c/MedSchoolInsiders",
                    type: "video",
                    duration: "Multiple videos",
                    tags: ["Mock Interviews", "Strategy", "Tips"]
                },
            ]
        },
        {
            category: "Blog Posts & Articles",
            items: [
                {
                    title: "Reddit r/premed",
                    description: "Comprehensive collection of advice and experiences ahead of medical school",
                    url: "https://www.reddit.com/r/premed/",
                    type: "forum",
                    duration: "Community",
                    tags: ["Community", "Experiences", "Advice"]
                },
                {
                    title: "Reddit r/medschool",
                    description: "Comprehensive collection of advice from folks in medical school",
                    url: "https://www.reddit.com/r/medschool/",
                    type: "forum",
                    duration: "Community",
                    tags: ["Community", "Experiences", "Advice"]
                },
                {
                    title: "AAMC Interview Guide",
                    description: "Sample questions asked of applicants during interviews",
                    url: "https://students-residents.aamc.org/interviewing-residency-positions/questions-frequently-asked-applicants-during-interviews",
                    type: "article",
                    duration: "5 min read",
                    tags: ["Official Guide", "Sample Questions", "Process"]
                },
            ]
        },
        {
            category: "Interview Techniques & Practice Resources",
            items: [
                {
                    title: "STAR Method Guide",
                    description: "How to structure behavioral interview responses effectively",
                    url: "https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-interview-response-technique",
                    type: "technique",
                    duration: "10 min read",
                    tags: ["STAR Method", "Behavioral", "Structure"]
                },
                {
                    title: "Body Language for Interviews",
                    description: "Non-verbal communication tips for medical school interviews. Honestly don't overthink this, but it's here if you want to read through it.",
                    url: "https://www.scienceofpeople.com/body-language-interview/",
                    type: "technique",
                    duration: "8 min read",
                    tags: ["Body Language", "Non-verbal", "Communication"]
                },
                {
                    title: "MMI (Multiple Mini Interview) Prep",
                    description: "120 more questions to practice with for the MMI",
                    url: "https://www.prospectivedoctor.com/multiple-mini-interview-sample-question/",
                    type: "technique",
                    duration: "10 min read",
                    tags: ["MMI", "Strategy", "Practice"]
                },
            ]
        },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'video': return <Play className="h-4 w-4" />;
            case 'article': return <FileText className="h-4 w-4" />;
            case 'forum': return <Users className="h-4 w-4" />;
            case 'technique': return <TrendingUp className="h-4 w-4" />;
            case 'service': return <Star className="h-4 w-4" />;
            case 'database': return <BookOpen className="h-4 w-4" />;
            case 'practice': return <Clock className="h-4 w-4" />;
            default: return <ExternalLink className="h-4 w-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'video': return 'from-red-500 to-pink-500';
            case 'article': return 'from-blue-500 to-indigo-500';
            case 'forum': return 'from-green-500 to-emerald-500';
            case 'technique': return 'from-purple-500 to-violet-500';
            case 'service': return 'from-yellow-500 to-orange-500';
            case 'database': return 'from-cyan-500 to-blue-500';
            case 'practice': return 'from-emerald-500 to-teal-500';
            default: return 'from-gray-500 to-slate-500';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Interview Resources
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Curated collection of the best interview tips, videos, articles, and practice resources
                        to help you ace your medical school interviews.
                    </p>
                </motion.div>

                {/* Resources by Category */}
                <div className="space-y-8">
                    {resources.map((category, categoryIndex) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.1 }}
                        >
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                {category.category}
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.items.map((item, itemIndex) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                                            <CardContent className="p-6 h-full flex flex-col">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className={`p-2 rounded-full bg-gradient-to-r ${getTypeColor(item.type)} text-white`}>
                                                        {getIcon(item.type)}
                                                    </div>
                                                </div>

                                                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                                    {item.title}
                                                </h3>

                                                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                                                    {item.description}
                                                </p>

                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Clock className="h-3 w-3" />
                                                        {item.duration}
                                                    </div>

                                                    <div className="flex flex-wrap gap-1">
                                                        {item.tags.map((tag) => (
                                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    <Button
                                                        asChild
                                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                                        size="sm"
                                                    >
                                                        <a
                                                            href={item.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center gap-2"
                                                        >
                                                            <ExternalLink className="h-3 w-3" />
                                                            Visit Resource
                                                        </a>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Back Button */}
                <motion.footer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-8"
                >
                    <Button
                        onClick={() => router.push('/')}
                        variant="outline"
                        size="lg"
                        className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Practice Questions
                    </Button>
                </motion.footer>
            </div>
        </div>
    );
} 