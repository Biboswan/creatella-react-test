import dayDifference from "../../utils/dayDifference";

const DateAdded = props => {
  const dayDiff = dayDifference(props.from);
  if (dayDiff === 0) {
    return "Today";
  } else if (dayDiff === 1) {
    return "Yesterday";
  } else if (dayDiff <= 7) {
    return `${dayDiff} days ago`;
  } else return new Date(props.from).toDateString();
};

export default DateAdded;
