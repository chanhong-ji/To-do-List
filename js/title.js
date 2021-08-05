const savedUsername = localStorage.getItem("username");
const span = document.querySelector(".title-bar__title");

span.innerText = `${savedUsername}'s Daily Report`;
