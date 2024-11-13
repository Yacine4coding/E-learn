import mongoose from "mongoose";
const studientSchema = mongoose.Schema({
  points: {
    type: Number,
    default: 0,
  },
});
const Studient = mongoose.model("studient", studientSchema);
export default Studient;
