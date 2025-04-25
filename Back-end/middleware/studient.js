export function generateStudientInfo(studient) {
  try {
    if (!studient) return false;
    const { points, _id } = studient;
    return { points, userId: _id.toString() };
  } catch (error) {
    console.log(error);
    return false;
  }
}
