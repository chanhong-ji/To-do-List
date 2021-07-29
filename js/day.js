const todayDate = document.querySelector(".day");
const monthList = [
  "Jen",
  "Feb",
  "Mar",
  "Apl",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function todayDateUpdate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const day = today.getDay();
  todayDate.innerText = `${dayList[day]}  ${
    monthList[month - 1]
  }      ${date} ${year}`;
}

todayDateUpdate();
setInterval(todayDateUpdate(), 1000);
