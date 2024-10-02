import moment from "moment";

export const formatEventDate = (startDate: string, endDate: string): string => {
  const start = moment(startDate);
  const end = moment(endDate);

  if (start.isSame(end, "day")) {
    return start.format("DD.MM.YYYY");
  }

  if (start.isSame(end, "month") && start.isSame(end, "year")) {
    return `${start.format("DD")} - ${end.format("DD")}.${start.format(
      "MM.YYYY"
    )}`;
  }

  if (start.isSame(end, "year")) {
    return `${start.format("DD.MM")} - ${end.format("DD.MM.YYYY")}`;
  }

  return `${start.format("DD.MM.YYYY")} - ${end.format("DD.MM.YYYY")}`;
};
