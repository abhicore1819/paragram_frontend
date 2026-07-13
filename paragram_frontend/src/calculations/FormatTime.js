import { CalendarDays, ClockArrowLeft, ToyBrick } from "lucide-react";

const FormatTime = (time) => {
    const postdate = new Date(time);
  const currentdate = new Date();
  const ms = currentdate - postdate;
  //   const ms = 2100000000;
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const weeks = Math.floor(day / 7);

  console.log(day);
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

// const res = FormatTime();
// console.log(res);
export default FormatTime