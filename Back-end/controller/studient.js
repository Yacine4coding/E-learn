import { generateStudientInfo } from "../middleware/studient.js";
import Studient from "../models/Studient.js";


export async function changePoint(req, res) {
  const { points } = req.body;
  const { userId } = req.params;
  if (!points) {
    res.status(422).send({ message: "points need to be different of 0" });
    return;
  }
  if (!userId) {
    res.status(422).send({ message: "user id not found" });
    return;
  }
  try {
    let studient = await Studient.findById(userId);
    if (!studient) {
      res.status(404).send({ message: "studient not found" });
      return;
    }
    studient.points += points;
    if (studient.points <= 0) studient.points = 0;
    studient = await studient.save();
    res.status(200).send({
      studient: generateStudientInfo(studient),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function buyCourse (req,res) {
    
}

// functions
export async function deleteStudient(studientId) {
  try {
    await Studient.findByIdAndDelete(studientId);
    return true;
  } catch (error) {
    return false;
  }
}
export async function createNewStudient() {
  try {
    const studient = await new Studient().save();
    return generateStudientInfo(studient);
  } catch (error) {
    return false;
  }
}
export async function getStudient(userId) {
  try {
    const studient = await Studient.findById(userId);
    return generateStudientInfo(studient);
  } catch (error) {
    return false;
  }
}