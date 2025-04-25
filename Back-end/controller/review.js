import { handleReview } from "../middleware/review.js";
import Courses from "../models/Course.js";
import Review from "../models/Review.js";
import { getCourseById } from "./courses.js";

export async function addReview(req, res) {
  const { message, star, userId: studentId, courseId } = req.body;
  if (!courseId)
    return res.status(422).send({
      message: "course id is required",
    });
  if (!message && !star) return res.status(204).send();
  try {
    // GET COURSE INFO
    const course = getCourseById(courseId);
    if (!course) return res.status(404).send({ message: "course not found" });
    const isReviewExist = await Review.findOne({ courseId, studentId });
    if (isReviewExist) {
      isReviewExist.star = star;
      isReviewExist.message = message;
      await isReviewExist.save();
      return res.status(200).send({ message: "review submitted" });
    }
    // CREATE NEW REVIEW
    const review = await new Review({
      studentId,
      star,
      message,
      courseId,
    }).save();
    // CALC THE STARS OF COURSE IF HE ADD ONE
    if (star) {
      const reviews = await Review.find({ courseId });
      const moy =
        reviews.reduce((prev, curr) => prev + curr.stars, 0) / reviews.length;
      await Courses.updateOne({ _id: course.id }, { $set: { stars: moy } });
    }
    // RETURN RES
    res.status(200).send({
      message: "review added successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}

export async function getReview(req, res) {
  const { courseId } = req.params;
  if (!courseId)
    return res.status(422).send({
      message: "course id is required",
    });
  try {
    // CHECK IF COURSE EXIST
    if (!(await getCourseById(courseId)))
      return res.status(404).send({ message: "course not found" });
    // GET REVIEWS OF COURSE
    const reviews = await Review.find({ courseId });
    if (reviews.length === 0) return res.status(204).send();
    // HANDEL REVIEWS DATA (GET USER OF EACH REVIEW)
    const handleReviews = [];
    for (let i = 0; i < reviews.length; i++) {
      const HandleReview = await handleReview(reviews[i]);
      if (HandleReview) {
        handleReviews.push(HandleReview);
      }
    }
    // SEND RES
    res.status(200).send({
      reviews: handleReviews,
    });
  } catch (error) {
    console.log(
      "error in get review function inside controller/reviw\n ",
      error
    );
    res.status(500).send({ message: "internal server error" });
  }
}

export async function getMyReview(req, res) {
  const { userId: studentId } = req.params;
  try {
    // GET REVIEWS BY student ID
    const reviewsData = Review.find({ studentId });
    if (!reviewsData) return res.status(204).send();
    // HANDLE REVIEWS (GET STUDENT INFORMATION)
    const reviews = [];
    for (let i = 0; i < reviewsData.length; i++) {
      const review = await handleReview(reviews[i]);
      if (review) reviews.push(review);
    }
    // SEND RES
    res.status(200).send({ reviews });
  } catch (error) {
    console.log(
      "error in get my review function inside controller/review \n",
      error
    );
  }
}

export async function getMyCourseReview(req, res) {
  const { userId: studentId } = req;
  const { courseId } = req.params;
  try {
    // GET REVIEWS BY student ID
    const reviewsData = await Review.findOne({ studentId, courseId });
    if (!reviewsData) return res.status(204).send();
    // HANDLE REVIEWS (GET STUDENT INFORMATION)
    const review = await handleReview(reviewsData);
    // SEND RES
    res.status(200).send({ review });
  } catch (error) {
    console.log(
      "error in get my review function inside controller/review \n",
      error
    );
  }
}
export async function updateReview(req, res) {}

export async function deleteReview(req, res) {
  const { userId, reviewId } = req.body;
  if (!reviewId)
    return res.status(422).send({ message: "review id is requered" });
  try {
    // GET REVIEW
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).send({ message: "review not found" });
    // CHECK IF IS HIS REVIEW
    if (review.studentId !== userId)
      return res
        .status(403)
        .send({ message: "is not your review check is yours first please" });
    // DELETE REVIEW
    await Review.deleteOne({ _id: reviewId });
    // SEND DATA
    res.status(204).send();
  } catch (error) {
    console.log("error in delete review inside controller/review \n", error);
  }
}
