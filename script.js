const formBtn = document.querySelectorAll(".form__buttons");

// listen for clicks on the right here button
let rightHereBtn = document.querySelector(".right_here");
rightHereBtn.addEventListener("click", right_here);

function right_here() {
  speakNow("Right Here");
}

// listen for clicks on the right here button
let rightNowBtn = document.querySelector(".right_now");
rightNowBtn.addEventListener("click", right_now);

function right_now() {
  speakNow("Right Now");
}

function speakNow(words) {
  let sayThis = new SpeechSynthesisUtterance(words);
  let synth = window.speechSynthesis;
  synth.speak(sayThis);
}

// listen for the form being submitted
let inputForm = document.querySelector("form");
inputForm.addEventListener("submit", handleFormSubmit);

// handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();
  var inputTxt = document.querySelector(".txt");
  speakNow(inputTxt.value);
  inputTxt.value = "";
  inputTxt.focus();
}

// audio player volume control
let audioPlayer = document.querySelector("audio");
audioPlayer.volume = 0.5;

let flashingBtn = document.querySelector(".lights__go-btn");
flashingBtn.addEventListener("click", changeColor);

let colorInterval;

// change background color when button is clicked, randomized it

function changeColor() {
  let randomeRed = Math.floor(Math.random() * 255);
  let randomeBlue = Math.floor(Math.random() * 255);
  let randomeGreen = Math.floor(Math.random() * 255);
  clearTimeout(colorInterval);
  colorInterval = setTimeout(changeColor, 500);

  document.body.style.backgroundColor = `rgb(${randomeRed}, ${randomeGreen}, ${randomeBlue})`;
}

let stopBtn = document.querySelector(".lights__stop-btn");
stopBtn.addEventListener("click", stopColorChange);

function stopColorChange() {
  clearTimeout(colorInterval);
}

// API

const gifSearchInput = document.querySelector(".gif__input");
const gifSearchSubmit = document.querySelector(".gif__btn");

gifSearchSubmit.addEventListener("click", gifFinder);

function gifFinder() {
  const searchTerm = gifSearchInput.value;
  console.log(searchTerm);
  if (searchTerm === "") return;

  const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${CONFIG.GIPHY_API_KEY}&q=${searchTerm}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateImage(data);
    })
    .catch((err) => {
      console.error(err);
    });

  // api.giphy.com / v1 / gifs / search;
}

function updateImage(data) {
  let gifImg = document.querySelector(".gif__img");
  let randomeNum = Math.floor(Math.random() * 20);
  gifImg.src = data.data[randomeNum].images.original.url;
}
