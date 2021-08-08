//placeholder 날짜 설정
const ddayInputDate = document.querySelector(".dday-form input:nth-child(2)");

const ddayToday = new Date();

ddayInputDate.value = `${ddayToday.getFullYear()}-${String(
  ddayToday.getMonth() + 1
).padStart(2, "0")}-${String(ddayToday.getDate()).padStart(2, "0")}`;

// 리스트 만들기

const ddayForm = document.querySelector(".dday-form");
const ddayLists = document.querySelector(".dday-lists");
const ddayTitle = ddayForm.querySelector("input:first-child");
const ddayDate = ddayForm.querySelector("input:last-child");
const colors = [
  "#ef577780",
  "#575fcf80",
  "#4bcffa80",
  "#34e7e480",
  "#0be88180",
  "#f53b5780",
  "#3c40c680",
  "#0fbcf980",
  "#00d8d680",
  "#05c46b80",
  "#ffc04880",
  "#ffdd5980",
  "#ff5e5780",
  "#d2dae280",
  "#48546080",
  "#ffa80180",
  "#ffd32a80",
  "#ff3f3480",
];
let ddays = [];
const savedDdays = localStorage.getItem("ddays");

ddayForm.addEventListener("submit", submitDdayForm);

function submitDdayForm(event) {
  event.preventDefault();
  const newDdayObj = {
    title: ddayTitle.value,
    date: ddayDate.value,
    id: Date.now(),
  };
  ddayTitle.value = "";
  ddayDate.value = "";
  ddays.push(newDdayObj);
  paintDday(newDdayObj);
  saveDdays();
}

function saveDdays() {
  localStorage.setItem("ddays", JSON.stringify(ddays));
}

function paintDday(ddayObj) {
  const li = document.createElement("li");
  const title = document.createElement("span");
  const date = document.createElement("span");
  const trash = document.createElement("span");
  ddayLists.appendChild(li);
  li.id = ddayObj.id;
  li.appendChild(title);
  li.appendChild(date);
  li.appendChild(trash);
  trash.innerHTML = '<i class="fas fa-times"></i>';
  title.innerText = ddayObj.title;
  date.innerText = `D-day ${getDistance(ddayToday, ddayObj.date)}`;
  const colorArray = chooseColors();
  li.style.background = `linear-gradient(to right, ${colorArray[0]}, ${colorArray[1]})`;
  trash.addEventListener("click", deleteDday);
}

function chooseColors() {
  const firstColor = colors[Math.floor(Math.random() * colors.length)];
  const secondColor = colors.filter((color) => color !== firstColor)[
    Math.floor(Math.random() * (colors.length - 1))
  ];
  return [firstColor, secondColor];
}

function getDistance(ddayToday, dDay) {
  const keys = dDay.split("-");
  const year = keys[0];
  const month = keys[1];
  const date = keys[2];
  const dday = new Date(+year, +(month - 1), +date);
  const diffTime = dday - ddayToday;
  let diffDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDate;
}

function deleteDday(event) {
  const li = event.target.parentElement.parentElement;
  ddays = ddays.filter((dday) => dday.id !== parseInt(li.id));
  li.remove();
  saveDdays();
}

if (savedDdays) {
  const parsedDdays = JSON.parse(savedDdays);
  ddays = parsedDdays;
  ddays.forEach(paintDday);
}
