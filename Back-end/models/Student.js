import mongoose from "mongoose";

const studientSchema = mongoose.Schema({
  points: {
    type: Number,
    default: 0,
  },
  notifications: {
    type: Array,
    default: [],
  },
  tasks: {
    type: Array,
    default: [],
  },
});
const Studient = mongoose.model("studient", studientSchema);
export default Studient;
