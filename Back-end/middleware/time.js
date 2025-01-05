import moment from "moment";

export function formatDate(date) {
  if (date) return moment(date).format("DD-MM-YYYY");
  return moment().format("DD-MM-YYYY");
}
