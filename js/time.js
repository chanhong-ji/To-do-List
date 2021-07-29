const time = document.querySelector(".time");
const ampm = document.querySelector(".top-bar__now span:nth-child(3)");

function getTime() {
  let date = new Date();
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  time.innerText = `${hours}:${minutes}`;
  let hoursNum = date.getHours();
  if (0 <= hoursNum || hoursNum < 12) {
    ampm.innerText = `AM`;
  } else {
    ampm.innerText = "PM";
  }
}
getTime();
setInterval(getTime, 1000);
