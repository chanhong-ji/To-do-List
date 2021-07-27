const images = ["0.jpg", "1.jpg", "2.jpg"];

const chosenImg = images[Math.floor(Math.random() * images.length)];

const bgImg = document.createElement("img");

bgImg.src = `img/${chosenImg}`;
bgImg.className = "bgimg";

document.body.appendChild(bgImg);
