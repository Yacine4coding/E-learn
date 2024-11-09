export function generateStudientInfo(studient) {
  const { points, notifications, tasks } = studient;
  return { points, notifications, tasks };
}
