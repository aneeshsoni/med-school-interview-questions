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
                    title: "Dr. Gray's Medical School Interviews",
                    description: "Comprehensive interview prep with real examples and common pitfalls",
                    url: "https://www.youtube.com/c/DrGrayMedSchool",
                    type: "video",
                    duration: "Multiple videos",
                    rating: 5,
                    tags: ["Interview Prep", "Common Questions", "Body Language"]
                },
                {
                    title: "Med School Insiders",
                    description: "Step-by-step interview strategies and mock interviews",
                    url: "https://www.youtube.com/c/MedSchoolInsiders",
                    type: "video",
                    duration: "Multiple videos",
                    rating: 5,
                    tags: ["Mock Interviews", "Strategy", "Tips"]
                },
                {
                    title: "The Premed Years",
                    description: "Personal experiences and advice from successful applicants",
                    url: "https://www.youtube.com/c/ThePremedYears",
                    type: "video",
                    duration: "Multiple videos",
                    rating: 4,
                    tags: ["Personal Stories", "Experience", "Advice"]
                }
            ]
        },
        {
            category: "Blog Posts & Articles",
            items: [
                {
                    title: "AAMC Interview Guide",
                    description: "Official guide to medical school interviews with sample questions",
                    url: "https://students-residents.aamc.org/preparing-medical-school/applying-medical-school/applying-medical-school-process/applying-medical-school-application/interview",
                    type: "article",
                    duration: "15 min read",
                    rating: 5,
                    tags: ["Official Guide", "Sample Questions", "Process"]
                },
                {
                    title: "SDN Interview Forum",
                    description: "Real interview experiences and tips from medical students",
                    url: "https://forums.studentdoctor.net/forums/pre-medical-allopathic-md.10/",
                    type: "forum",
                    duration: "Community",
                    rating: 4,
                    tags: ["Real Experiences", "Community", "Tips"]
                },
                {
                    title: "Reddit r/premed Interview Megathread",
                    description: "Comprehensive collection of interview advice and experiences",
                    url: "https://www.reddit.com/r/premed/search/?q=interview%20megathread&restrict_sr=1",
                    type: "forum",
                    duration: "Community",
                    rating: 4,
                    tags: ["Community", "Experiences", "Advice"]
                }
            ]
        },
        {
            category: "Interview Techniques",
            items: [
                {
                    title: "STAR Method Guide",
                    description: "How to structure behavioral interview responses effectively",
                    url: "https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-interview-response-technique",
                    type: "technique",
                    duration: "10 min read",
                    rating: 5,
                    tags: ["STAR Method", "Behavioral", "Structure"]
                },
                {
                    title: "Body Language for Interviews",
                    description: "Non-verbal communication tips for medical school interviews",
                    url: "https://www.scienceofpeople.com/body-language-interview/",
                    type: "technique",
                    duration: "8 min read",
                    rating: 4,
                    tags: ["Body Language", "Non-verbal", "Communication"]
                },
                {
                    title: "MMI (Multiple Mini Interview) Prep",
                    description: "Specific strategies for MMI-style interviews",
                    url: "https://www.prospectivedoctor.com/mmi-prep/",
                    type: "technique",
                    duration: "12 min read",
                    rating: 4,
                    tags: ["MMI", "Strategy", "Practice"]
                }
            ]
        },
        {
            category: "Practice Resources",
            items: [
                {
                    title: "Mock Interview Services",
                    description: "Professional mock interview services for medical school applicants",
                    url: "https://www.medschoolinsiders.com/mock-interviews/",
                    type: "service",
                    duration: "Paid Service",
                    rating: 5,
                    tags: ["Mock Interviews", "Professional", "Feedback"]
                },
                {
                    title: "Interview Question Database",
                    description: "Extensive database of medical school interview questions by category",
                    url: "https://www.prospectivedoctor.com/interview-questions/",
                    type: "database",
                    duration: "Free Resource",
                    rating: 4,
                    tags: ["Question Database", "Categories", "Free"]
                },
                {
                    title: "Ethics Case Studies",
                    description: "Practice ethical scenarios commonly asked in medical school interviews",
                    url: "https://www.medschoolinsiders.com/medical-ethics/",
                    type: "practice",
                    duration: "Multiple cases",
                    rating: 4,
                    tags: ["Ethics", "Case Studies", "Practice"]
                }
            ]
        },
        {
            category: "School-Specific Resources",
            items: [
                {
                    title: "MSAR Interview Information",
                    description: "Official interview information for each medical school",
                    url: "https://students-residents.aamc.org/applying-medical-school/applying-medical-school-process/applying-medical-school-application/interview",
                    type: "database",
                    duration: "School-specific",
                    rating: 5,
                    tags: ["Official", "School-specific", "Process"]
                },
                {
                    title: "Student Doctor Network School-Specific Forums",
                    description: "Interview experiences and tips for specific medical schools",
                    url: "https://forums.studentdoctor.net/forums/medical-school-specific-discussions.12/",
                    type: "forum",
                    duration: "Community",
                    rating: 4,
                    tags: ["School-specific", "Experiences", "Community"]
                }
            ]
        }
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

                {/* Tips Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12"
                >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-center">
                                💡 Pro Tips for Using These Resources
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-blue-600">📚 Study Strategy</h4>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Start with official guides (AAMC) for foundational knowledge</li>
                                        <li>• Watch YouTube videos for visual learning and examples</li>
                                        <li>• Practice with mock interviews to build confidence</li>
                                        <li>• Read real experiences to understand what to expect</li>
                                    </ul>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-purple-600">🎯 Application Tips</h4>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Focus on school-specific resources for your target programs</li>
                                        <li>• Practice ethical scenarios regularly</li>
                                        <li>• Record yourself answering questions to improve delivery</li>
                                        <li>• Join online communities for peer support and advice</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

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