const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const today = new Date();
let viewDate = today;
let viewYear = viewDate.getFullYear();
let viewMonth = viewDate.getMonth();
let DateBox = document.querySelector(".calendar span");
let calendarBox = document.querySelector(".calendar__box");

function paintViewDate() {
  DateBox.innerText = "";
  DateBox.innerText = `${monthName[viewMonth]} ${viewYear}`;
}

function paintCalendar() {
  calendarBox.innerHTML = "";
  const dayBox = document.createElement("div");
  calendarBox.appendChild(dayBox);
  for (let i = 0; i < 7; i++) {
    let day = document.createElement("div");
    day.innerText = `${dayName[i]}`;
    dayBox.appendChild(day);
  }
  const numberOfDays_now = numberOfDays[viewMonth];
  let cnt = 1;
  let firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay(); //1일이 무슨요일인가! 5
  outer: for (let i = 0; i < 6; i++) {
    let calendarColumn = document.createElement("div");
    calendarBox.appendChild(calendarColumn);

    for (let j = 0; j < 7; j++) {
      let calendarSpace = document.createElement("div");
      calendarColumn.appendChild(calendarSpace);
      if (i == 0 && j < firstDayOfMonth) continue;
      if (viewMonth === today.getMonth() && today.getDate() === cnt) {
        calendarSpace.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      }
      calendarSpace.innerText = cnt++;
      if (cnt > numberOfDays_now) break outer;
    }
  }
}

paintViewDate();
paintCalendar();

// 달력 페이지 넘기기
const calPrevBtn = document.querySelector(".calendar__top-bar i:first-child");
const calNextBtn = document.querySelector(".calendar__top-bar i:last-child");

calPrevBtn.addEventListener("click", () => {
  if (viewMonth < 1) return;
  viewMonth -= 1;
  paintViewDate();
  paintCalendar();
});
calNextBtn.addEventListener("click", () => {
  if (viewMonth > 10) return;
  viewMonth += 1;
  paintViewDate();
  paintCalendar();
});
