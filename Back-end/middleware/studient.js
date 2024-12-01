export function generateStudientInfo(studient) {
  try {
    const { points, _id } = studient;
    return { points, userId: _id.toString() };
  } catch (error) {
    console.log(error);
    return false;
  }
}
