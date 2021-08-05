const musicLists = document.querySelectorAll(".music-list");
const playboxCover = document.querySelector(".play-box__cover");
const playboxInfo = document.querySelector(".play-box__info");
const playboxTitle = playboxInfo.querySelector("span:first-child");
const playboxAuthor = playboxInfo.querySelector("span:nth-child(2)");
const nextBtn = document.querySelector(".play-box__bar span:last-child");
const playBtn = document.querySelector(".play-box__bar span:first-child");
const playBtnIcon = playBtn.querySelector("i");
let currMusicNum = 0;

const STOP_CLASSNAME = "fas fa-stop-circle fa-lg";
const PLAY_CLASSNAME = "fas fa-play fa-lg";

musicLists.forEach((musicList) => {
  musicList.addEventListener("click", () => changeMusic(musicList));
});
musicLists[0].click();

function changeMusic(currMusicList) {
  paintMusicList(currMusicList);
  playBoxChange(currMusicList);
  currMusicNum = Array.from(musicLists).indexOf(currMusicList);
}

function paintMusicList(musicList) {
  musicList.style.boxShadow = "0 0 40px -10px black";
  let restMusicList = Array.from(musicLists).filter(
    (rest) => rest !== musicList
  );
  restMusicList.forEach((item) => {
    item.style.boxShadow = "none";
  });
}

function playBoxChange(currMusicList) {
  playboxCover.src = currMusicList.childNodes[3].currentSrc;
  playboxTitle.innerText = currMusicList.innerText;
  playboxAuthor.innerText = currMusicList.querySelector(
    ".music-list__author"
  ).innerText;
  playboxAuthor.style.fontSize = "15px";
  playBtnIcon.className = STOP_CLASSNAME;
}

function changeNextMusic() {
  currMusicNum = currMusicNum < musicLists.length - 1 ? currMusicNum + 1 : 0;
  const nowMusic = Array.from(musicLists)[currMusicNum];
  paintMusicList(nowMusic);
  playBoxChange(nowMusic);
}

nextBtn.addEventListener("click", changeNextMusic);

function onPlayBtnClink() {
  if (playBtnIcon.className == PLAY_CLASSNAME) {
    playBtnIcon.className = STOP_CLASSNAME;
    musicLists[currMusicNum].click();
  } else {
    playBtnIcon.className = PLAY_CLASSNAME;
    musicLists.forEach((item) => {
      item.style.boxShadow = "none";
    });
  }
}

playBtn.addEventListener("click", onPlayBtnClink);
