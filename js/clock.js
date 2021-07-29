const clock = document.querySelector(".clock");

function getClock() {
  const date = new Date();
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  // let seconds = String(date.getSeconds()).padStart(2, "0");
  // clock.innerText = `${hours}:${minutes}:${seconds}`;
  clock.innerText = `${hours}:${minutes}`;
}
getClock();
setInterval(getClock, 1000);
