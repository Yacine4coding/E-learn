"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Star, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock quiz results (replace with actual data fetching in a real app)
const mockQuizResults = [
  { quizName: "Introduction Quiz", score: 8, totalQuestions: 10 },
  { quizName: "Chapter 1 Quiz", score: 9, totalQuestions: 10 },
  { quizName: "Chapter 2 Quiz", score: 7, totalQuestions: 10 },
  { quizName: "Final Quiz", score: 18, totalQuestions: 20 },
];

// rating gui
import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { handleReview } from "@/request/courses";
import { successNotifcation } from "@/components/toast";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const CourseFinalPage = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hover, setHover] = React.useState(-1);
  const { courseId } = useParams();
  const handleRating = (value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async () => {
    const { status, data } = await handleReview(review, rating, courseId);
    if(status === 200) {
      successNotifcation(data.message)
      handleSkip();
    }
    //handle review
  };

  const handleSkip = () => {
    setIsSubmitted(true);
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  const totalScore = mockQuizResults.reduce((sum, quiz) => sum + quiz.score, 0);
  const totalQuestions = mockQuizResults.reduce(
    (sum, quiz) => sum + quiz.totalQuestions,
    0
  );
  const overallPercentage = Math.round((totalScore / totalQuestions) * 100);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 font-gilroy">
      <AnimatePresence>
        {!isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Course Completed!</CardTitle>
                <CardDescription>
                  We'd love to hear your thoughts on the course.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Rate this course:</p>
                  <div className="flex space-x-1">
                    <Rating
                      name="hover-feedback"
                      defaultValue={2.5}
                      value={rating}
                      size="large"
                      precision={0.5}
                      getLabelText={getLabelText}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    {rating !== null && (
                      <Box sx={{ ml: 2 }}>
                        {labels[hover !== -1 ? hover : rating]}
                      </Box>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">
                    Write a review (optional):
                  </p>
                  <Textarea
                    placeholder="Share your experience with this course..."
                    value={review}
                    onChange={handleReviewChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  className="text-green-700 font-semibold border-green-700 hover:border-green-500 hover:text-green-500 hoverTransition "
                  onClick={handleSkip}
                >
                  Skip
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-green-500 font-semibold hover:bg-green-400 hoverTransition text-white"
                >
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {isSubmitted && !showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.1 }}
              animate={{ scale: 1.5 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <Check className="w-16 h-16 text-green-500" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">
              Course Completed Successfully!
            </h2>
            <Button
              onClick={handleFinish}
              className="mt-4 bg-green-500 font-semibold hover:bg-green-400 hoverTransition text-white"
            >
              View Results <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Your Course Results</CardTitle>
                <CardDescription>
                  Here's how you performed in the course quizzes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockQuizResults.map((quiz, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{quiz.quizName}</span>
                      <span className="font-medium">
                        {quiz.score}/{quiz.totalQuestions}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center font-bold">
                      <span>Overall Score</span>
                      <span>{overallPercentage}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => router.push("/dashboards/User")}
                  className="w-full text-green-700 font-semibold border-green-700 hover:border-green-500 hover:text-green-500 hoverTransition "
                >
                  Return to Dashboard
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseFinalPage;
