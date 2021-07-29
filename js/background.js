const images = ["0.jpg", "1.jpg", "2.jpg"];
// , "3.jpg", "4.jpg", "5.jpg"

const chosenImg = images[Math.floor(Math.random() * images.length)];

const bgImg = document.createElement("img");

const blackCover = document.createElement("div");

bgImg.src = `img/${chosenImg}`;
bgImg.className = "bgimg";
blackCover.className = "black-cover";
document.body.appendChild(bgImg);
document.body.appendChild(blackCover);
