'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Award, BarChart2, Users, CheckCircle, XCircle, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';

const LESSONS = [
  {
    id: 1,
    title: 'Stock Market Basics',
    icon: <Award className='text-green-600' size={28} />,
    description: 'Understand what stocks are and how trading works.',
    completed: true,
    locked: false,
  },
  {
    id: 2,
    title: 'Types of Orders',
    icon: <BarChart2 className='text-blue-500' size={28} />,
    description: 'Learn about market, limit, and stop orders.',
    completed: true,
    locked: false,
  },
  {
    id: 3,
    title: 'Reading Stock Charts',
    icon: <Calendar className='text-purple-500' size={28} />,
    description: 'Analyze trends and price movement.',
    completed: false,
    locked: false,
  },
  {
    id: 4,
    title: 'Risk Management',
    icon: <Users className='text-yellow-500' size={28} />,
    description: 'Protect your portfolio and manage losses.',
    completed: false,
    locked: true,
  },
  {
    id: 5,
    title: 'Developing a Strategy',
    icon: <Rocket className='text-red-500' size={28} />,
    description: 'Build and test your trading approach.',
    completed: false,
    locked: true,
  },
];

const TESTIMONIALS = [
  {
    name: 'Alex Chen',
    avatar: '/avatars/alex.png',
    text: "I never thought I'd understand trading. This app made learning the stock market fun and achievable!",
    progress: 80,
  },
  {
    name: 'Morgan Lee',
    avatar: '/avatars/morgan.png',
    text: "The lesson stages keep me motivated every day. It's the Duolingo of investing!",
    progress: 60,
  },
  {
    name: 'Jordan Smith',
    avatar: '/avatars/jordan.png',
    text: "I love earning badges as I level up my trading knowledge. Highly recommend!",
    progress: 95,
  },
];

function LessonStage({
  lesson,
  onStart,
}: {
  lesson: typeof LESSONS[0];
  onStart: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: lesson.id * 0.1 }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={`flex flex-col items-center gap-3 p-5 w-56 shadow-md transition-opacity ${
              lesson.locked
                ? 'opacity-50 cursor-not-allowed'
                : lesson.completed
                ? 'ring-2 ring-green-500'
                : 'hover:shadow-lg'
            }`}
          >
            <CardHeader className='flex flex-col items-center gap-2'>
              <div>{lesson.icon}</div>
              <CardTitle className='text-lg text-center'>{lesson.title}</CardTitle>
              <CardDescription className='text-center'>{lesson.description}</CardDescription>
            </CardHeader>
            <CardFooter className='flex flex-col gap-2 items-center'>
              {lesson.completed ? (
                <Badge variant='success' className='flex items-center gap-1'><CheckCircle size={16} />Completed</Badge>
              ) : lesson.locked ? (
                <Badge variant='secondary' className='flex items-center gap-1'><XCircle size={16} />Locked</Badge>
              ) : (
                <Button size='sm' onClick={onStart}>Start Lesson</Button>
              )}
            </CardFooter>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          {lesson.locked
            ? 'Complete previous lessons to unlock.'
            : lesson.completed
            ? 'Lesson completed!'
            : 'Start this lesson.'}
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: typeof TESTIMONIALS[0];
}) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, type: 'spring' }}
      viewport={{ once: true }}
    >
      <Card className='p-5 flex flex-col gap-3 shadow-md'>
        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarImage src={testimonial.avatar} alt={`${testimonial.name}'s avatar`} />
            <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className='font-semibold'>{testimonial.name}</div>
            <Progress value={testimonial.progress} className='mt-1 w-24 h-2' />
          </div>
        </div>
        <div className='italic text-muted-foreground'>" {testimonial.text} "</div>
      </Card>
    </motion.div>
  );
}

function LandingPage() {
  const [activeTab, setActiveTab] = useState('stages');
  const [search, setSearch] = useState('');

  const filteredLessons = LESSONS.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(search.toLowerCase()) ||
      lesson.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className='font-sans bg-background min-h-screen'>
      {/* Hero Section */}
      <section className='py-16 bg-gradient-to-b from-primary/10 to-background'>
        <div className='container mx-auto px-4 grid gap-8 place-items-center'>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='flex flex-col items-center gap-6'
          >
            <Badge variant='outline' className='flex items-center gap-1 text-primary mb-2'>
              <Rocket size={18} /> New for 2024
            </Badge>
            <h1 className='text-4xl md:text-5xl font-bold text-center leading-tight'>
              Level Up Your Trading<br />
              <span className='text-primary'>Duolingo Style.</span>
            </h1>
            <p className='max-w-xl text-center text-gray-600 text-lg'>
              Learn the stock market step by step, unlock new lessons, and earn badges as you go. Trading education has never been this fun and interactive.
            </p>
            <Button size='lg' className='flex items-center gap-2'>
              Get Started
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Lesson Stages */}
      <section className='py-16'>
        <div className='container mx-auto px-4 flex flex-col gap-10'>
          <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6'>
            <div>
              <h2 className='text-2xl font-semibold mb-1'>Your Learning Path</h2>
              <p className='text-muted-foreground'>
                Progress through lessons, unlock new topics, and master trading concepts one stage at a time.
              </p>
            </div>
            <div className='flex gap-2 items-center'>
              <Input
                placeholder='Search lessons...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='max-w-xs'
              />
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='mb-6'>
              <TabsTrigger value='stages'>Lesson Stages</TabsTrigger>
              <TabsTrigger value='badges'>Your Badges</TabsTrigger>
              <TabsTrigger value='progress'>Progress</TabsTrigger>
            </TabsList>
            <TabsContent value='stages'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center'>
                {filteredLessons.map((lesson) => (
                  <LessonStage
                    key={lesson.id}
                    lesson={lesson}
                    onStart={() => {/* Future: route to lesson */}}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value='badges'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                <Card className='p-6 flex flex-col gap-3 items-center'>
                  <Award className='text-yellow-500' size={40} />
                  <div className='font-semibold'>Beginner Trader</div>
                  <Badge variant='secondary'>Earned</Badge>
                </Card>
                <Card className='p-6 flex flex-col gap-3 items-center'>
                  <BarChart2 className='text-green-500' size={40} />
                  <div className='font-semibold'>Chart Reader</div>
                  <Badge variant='secondary'>Locked</Badge>
                </Card>
                <Card className='p-6 flex flex-col gap-3 items-center'>
                  <Rocket className='text-red-500' size={40} />
                  <div className='font-semibold'>Market Explorer</div>
                  <Badge variant='secondary'>Locked</Badge>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value='progress'>
              <Card className='p-6 flex flex-col gap-4 max-w-xl'>
                <div className='flex items-center gap-2'>
                  <BarChart2 className='text-primary' size={24} />
                  <div className='font-semibold'>Overall Progress</div>
                </div>
                <Progress value={((LESSONS.filter(l => l.completed).length) / LESSONS.length) * 100} className='h-3' />
                <div className='text-muted-foreground'>
                  {LESSONS.filter(l => l.completed).length} of {LESSONS.length} lessons completed
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-16 bg-muted/50'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='flex flex-col items-center gap-6 mb-8'
          >
            <h2 className='text-2xl font-semibold'>Hear From Our Learners</h2>
            <p className='text-center max-w-xl text-muted-foreground'>
              Join thousands of aspiring traders who are mastering the stock market, one lesson at a time.
            </p>
          </motion.div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {TESTIMONIALS.map((testimonial, i) => (
              <TestimonialCard testimonial={testimonial} key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4 max-w-3xl'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='flex flex-col items-center gap-6 mb-8'
          >
            <h2 className='text-2xl font-semibold'>Frequently Asked Questions</h2>
          </motion.div>
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='q1'>
              <AccordionTrigger>Is this app free to use?</AccordionTrigger>
              <AccordionContent>
                Yes! You can access all the core lessons for free. We may offer advanced features in the future.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='q2'>
              <AccordionTrigger>Do I need prior trading experience?</AccordionTrigger>
              <AccordionContent>
                No prior experience is needed. We start with the basics and guide you through each concept step by step.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='q3'>
              <AccordionTrigger>How are lessons structured?</AccordionTrigger>
              <AccordionContent>
                Lessons are grouped into stages. Complete each stage to unlock the next, just like Duolingo!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='q4'>
              <AccordionTrigger>Can I track my progress?</AccordionTrigger>
              <AccordionContent>
                Absolutely! Your progress is visualized after each lesson and in the progress tab.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-16 bg-primary/10'>
        <div className='container mx-auto px-4 flex flex-col items-center gap-6'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='w-full flex flex-col gap-4 items-center'
          >
            <h2 className='text-3xl font-bold text-center'>
              Ready to start your trading journey?
            </h2>
            <p className='text-center max-w-xl text-muted-foreground'>
              Sign up now and unlock your first lesson today. No experience required.
            </p>
            <Button size='lg' className='flex items-center gap-2'>
              Start Learning
              <Rocket size={18} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Alert */}
      <Alert className='fixed bottom-6 right-6 w-80 shadow-lg z-50'>
        <BarChart2 className='h-5 w-5 text-primary' />
        <AlertTitle>Beta Release</AlertTitle>
        <AlertDescription>
          This app is in early access. Your feedback helps us improve!
        </AlertDescription>
      </Alert>
    </main>
  );
}

export default LandingPage;