import mongoose from "mongoose";

const studientSchema = mongoose.Schema({
  points: {
    type: Number,
    default: 0,
  },
  tasks: {
    type: Array,
    default: [],
  },
  courses : {
    type : Array,
    default : []
  }
});
const Studient = mongoose.model("studient", studientSchema);
export default Studient;
