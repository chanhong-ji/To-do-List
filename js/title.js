const savedUsername = localStorage.getItem("username");
const span = document.querySelector(".title");

span.innerText = `${savedUsername}'s Daily Report`;
