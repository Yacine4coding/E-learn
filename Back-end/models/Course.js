import mongoose from "mongoose";

const coursesShcema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    default: "",
  },
  level : {
    type : String , 
    require : true ,
  },
  category : {
    type : String , 
    require : true ,
  },
  price: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  stars: {
    type: Object,
    default: {
      usersId: [],
      count: Number,
    },
  },
  teacherId: {
    type: String,
    require: true,
  },
  chapterNumber: {
    type: Number,
    min: 1,
    require: true,
  },
  introduction : {
    type: Object,
    require : true ,
  },
  chapters: {
    type: Array,
    require: true,
  },
  picture: {
    type: String,
    require: true,
  },
});
const Courses = mongoose.model("course", coursesShcema);
export default Courses;
