"use client"

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CustomProgress from '@/components/CustomUI/Progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/CustomUI/tabs"

const PaidCourse = ({course}) => {
console.log(course)

  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const handleQuizChange = (quizIndex, choiceIndex) => {
    setQuizAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizIndex]: choiceIndex,
    }))
  }

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    console.log('Quiz answers submitted:', quizAnswers)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="text-sm text-muted-foreground">Development / Mobile Engineer</div>
        <h1 className="text-3xl font-bold mt-2">{course.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-muted-foreground capitalize">{course.username}</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{course.stars.count}</span>
            <span className="text-muted-foreground">({course.view.count} ratings)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="relative aspect-video bg-black mb-6 rounded-3xl overflow-hidden">
            <video className="w-full h-full" poster="/placeholder.svg" controls>
              <source src="https://youtu.be/U8F5G5wR1mk?list=RDU8F5G5wR1mk" type="video/mp4" />
            </video>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="Quiz">
            <TabsList>
              <TabsTrigger value="Quiz">Quiz</TabsTrigger>
              <TabsTrigger value="Description">Description</TabsTrigger>
              <TabsTrigger value="Courses">Courses</TabsTrigger>
              <TabsTrigger value="Review">Review</TabsTrigger>
            </TabsList>

            {/* Quiz */}
            <TabsContent value="Quiz">
              <div className="mt-8">
                <h2 className="text-lg font-gilory mb-2 font-bold">Chapter Quizzes</h2>
                <div className="space-y-2">
                  {[
                    {
                      question: "What is the main purpose of Vue.js components?",
                      choices: [
                        "To style web pages",
                        "To create reusable UI elements",
                        "To handle server requests",
                        "To manage databases"
                      ],
                      correct: 1
                    },
                    {
                      question: "Which directive is used for two-way data binding in Vue.js?",
                      choices: [
                        "v-if",
                        "v-for",
                        "v-model",
                        "v-bind"
                      ],
                      correct: 2
                    },
                    {
                      question: "What is the Vue Router used for?",
                      choices: [
                        "State management",
                        "Form validation",
                        "API calls",
                        "Navigation management"
                      ],
                      correct: 3
                    },
                    {
                      question: "Which lifecycle hook is called after a Vue component is mounted?",
                      choices: [
                        "beforeCreate",
                        "created",
                        "beforeMount",
                        "mounted"
                      ],
                      correct: 3
                    },
                    {
                      question: "What is Vuex primarily used for?",
                      choices: [
                        "State management",
                        "Routing",
                        "Form handling",
                        "API integration"
                      ],
                      correct: 0
                    }
                  ].map((quiz, index) => (
                    <div key={index} className="border rounded-sm p-4">
                      <h3 className="text-md font-semibold mb-4">Quiz {index + 1}: {quiz.question}</h3>
                      <div className="space-y-2">
                        {quiz.choices.map((choice, choiceIndex) => (
                          <div
                            key={choiceIndex}
                            className={`flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer ${
                              quizSubmitted && quizAnswers[index] === choiceIndex
                                ? quiz.correct === choiceIndex
                                  ? 'bg-green-100'
                                  : 'bg-red-100'
                                : ''
                            }`}
                            onClick={() => handleQuizChange(index, choiceIndex)}
                          >
                            <input
                              type="radio"
                              id={`quiz-${index}-choice-${choiceIndex}`}
                              name={`quiz-${index}`}
                              className="w-4 h-4 text-primary"
                              checked={quizAnswers[index] === choiceIndex}
                              onChange={() => handleQuizChange(index, choiceIndex)}
                            />
                            <label
                              htmlFor={`quiz-${index}-choice-${choiceIndex}`}
                              className="flex-grow cursor-pointer"
                            >
                              {choice}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6" onClick={handleQuizSubmit}>Submit All Answers</Button>
              </div>
            </TabsContent>

            {/* Description */}
            <TabsContent value="Description">
              <div className="ml-4 space-y-2">
                <h2 className="text-md font-bold">Make Uber Clone App</h2>
                <p className="text-gray-500 font-normal text-sm">{course.description}
                </p>
              </div>
            </TabsContent>

            {/* Course Content */}
            <TabsContent value="Courses">
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  { title: "Chapter 1: Course Overview", videos: "1/12 Videos", duration: "28m" },
                  { title: "Chapter 2: Curriculum", videos: "1/12 Videos", duration: "1h 28m" },
                  { title: "Chapter 3: Components", videos: "1/12 Videos", duration: "1h 28m" },
                  { title: "Chapter 4: Coding", videos: "1/12 Videos", duration: "1h 28m" }
                ].map((chapter, index) => (
                  <AccordionItem key={index} value={`chapter-${index}`} className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex flex-col items-start">
                        <div className="font-medium">{chapter.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {chapter.videos} • {chapter.duration}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2">
                        {["Installing Vue JS", "Understand Vue Components", "Vue Templating", "Vue Forms", "Vue Styling", "Vue Routing", "Vue Animation"].map((lesson, i) => (
                          <div key={i} className="flex items-center gap-2 py-2">
                            <div className="w-2 h-2 rounded-full bg-muted" />
                            <span>{lesson}</span>
                            <span className="text-sm text-muted-foreground ml-auto">12m</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Review */}
            <TabsContent value="Review">
              <div className="mb-8">
                <h2 className="text-md font-bold mb-1">Review</h2>
                <div className="space-y-6">
                  {[
                    {
                      name: "Leonardo Da Vinci",
                      comment: "Loved the course, I've learned some very subtle tecniques, expecially on leaves."
                    },
                    {
                      name: "Titania S",
                      comment: "I loved the course, it had been a long time since I had experimented with watercolors and now I will do it more often thanks to Yacine Bensidahmed"
                    },
                    {
                      name: "Zhirkov",
                      comment: "Yes..I just emphasize that the use of Photoshop, for non-users, becomes difficult to follow. What requires a course to master it. Safe and very didactic teacher."
                    }
                  ].map((review, index) => (
                    <div key={index} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={`@/public/avatars/avatar${index}.png`} alt={review.name} />
                        <AvatarFallback>{review.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-sm text-[#3DCBB1]">{review.name}</h3>
                        <p className="text-sm text-gray-500 font-normal">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Progress Card */}
          <div className="border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Chapter 1: Preparations</h2>
            <div className="flex items-center justify-between mb-2">
              <span>{course.progress.chapterNumber} Lectures</span>
              <span className="text-primary">{course.progress.for100}% completed</span>
            </div>
            <CustomProgress value={course.progress.chapterNumber} max={course.chapterNumber} className="my-1" />
            <div className="space-y-4">
              {[
                { title: "Installing Vue JS", status: "completed" },
                { title: "Understand Vue Components", status: "playing" },
                { title: "Vue Templating", status: "pending" },
                { title: "Vue Forms", status: "pending" },
                { title: "Vue Styling", status: "pending" },
                { title: "Vue Routing", status: "pending" },
                { title: "Vue Animation", status: "pending" }
              ].map((lesson, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    lesson.status === 'completed' ? 'bg-green-500' :
                    lesson.status === 'playing' ? 'bg-pink-500' :
                    'bg-muted'
                  }`} />
                  <span className={lesson.status === 'playing' ? 'text-pink-500' : ''}>{lesson.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaidCourse