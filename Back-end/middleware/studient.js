export function generateStudientInfo(studient) {
  try {
    const { points, tasks ,_id } = studient;
    return { points, tasks, userId: _id.toString() };
  } catch (error) {
    console.log(error);
    return false;
  }
}
