import { CalendarDays, ClockArrowLeft, ToyBrick } from "lucide-react";

const FormatTime = (time) => {
  const postdate = new Date(time);
  const currentdate = new Date();
  const ms = currentdate - postdate;
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const weeks = Math.floor(day / 7);

  if (day > 14) {
    return `${weeks} weeks ago`;
  }
  if (day > 7 && day < 14) {
    return `${weeks} week ago`;
  }
  if (day > 1) {
    return `${day} days ago`;
  }
  if (day === 1) {
    return `${day} day ago`;
  }
  if (min >= 60) {
    return `${hr}h ago`;
  }
  if (sec >= 60) {
    return `${min}m ago`;
  }
  if (sec < 60) {
    return `${sec}s ago`;
  }
};

export function FormatJoinDate(time) {
  const joniningdate = new Date(time);
  const joiningyear = joniningdate.getFullYear();
  const getmonth = joniningdate.getMonth();
  let month = "";

  switch (getmonth) {
    case 0:
      month = "jan";
      break;

    case 1:
      month = "feb";
      break;

    case 2:
      month = "mar";
      break;

    case 3:
      month = "apr";
      break;

    case 4:
      month = "may";
      break;

    case 5:
      month = "june";
      break;

    case 6:
      month = "jul";
      break;

    case 7:
      month = "aug";
      break;

    case 8:
      month = "sept";
      break;

    case 9:
      month = "oct";
      break;

    case 10:
      month = "nov";
      break;

    case 11:
      month = "dec";
      break;

    default:
      break;
  }
  return `${month} ${joiningyear}`;
}
export default FormatTime;
