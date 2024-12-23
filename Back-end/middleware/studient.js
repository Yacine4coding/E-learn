export function generateStudientInfo(studient) {
  try {
    const { points, _id, favorite, wishlist } = studient;
    return { points, userId: _id.toString(), favorite, wishlist };
  } catch (error) {
    console.log(error);
    return false;
  }
}
