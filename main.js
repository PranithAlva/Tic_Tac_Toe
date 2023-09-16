//global variables

//control on root elemetnt
const root = document.documentElement;
let mode = true; //false=night or true=day

let playerOne = null;
let playerTwo = null;

//it related to array below
let interruptType = 0;

let playerTurn = 0;

//array with messages
const gameMessages = [
	"Please enter <strong style='color:var(--secondary-color)'>player_one</strong>  name",
	"Please enter <strong style='color:var(--secondary-color)'>Player_two</strong> name ",
	`Congratulations <strong style='color:var(--secondary-color)'>${playerOne}</strong> wins!!`,
	`Congratulations <strong style='color:var(--secondary-color)'>${playerTwo}</strong> wins!!`,
	"It's not <strong style='color:var(--secondary-color)'> over yet </strong>!!!",
	"But in the end it dosnot <strong style='color:var(--secondary-color)'>even matter</strong>!!",
];

let markerOne = document.getElementById("player1-classico");
markerOne.classList.remove("player-marker");

let markerTwo = document.getElementById("player2-classico");
markerTwo.classList.remove("player-marker");

//first function to run
function pageLoad() {
	let marker = markerOne.cloneNode(true);
	document.getElementById("left-logo").appendChild(marker);

	marker = markerTwo.cloneNode(true);
	document.getElementById("right-logo").appendChild(marker);
}

function changeMode(e) {
	let slideBox = document.getElementById("slide-box");
	let coordinates = slideBox.getBoundingClientRect();
	let slideCoordinates = e.clientX;
	if (coordinates.top <= e.clientY && coordinates.bottom >= e.clientY) {
		let x =
			coordinates.left <= slideCoordinates &&
			(coordinates.right >= slideCoordinates ||
				coordinates.right <= slideCoordinates);
		let y =
			coordinates.right >= slideCoordinates &&
			(coordinates.left >= slideCoordinates ||
				coordinates.left <= slideCoordinates);
		if (x || y) {
			if (mode == true) {
				this.style.animation = "slideX 200ms linear 0ms 1 normal forwards";
				root.classList.toggle("dark-theme");
			}

			if (mode == false) {
				this.style.animation = "slideY 200ms linear 0ms 1 normal forwards";
				root.classList.toggle("dark-theme");
			}
			mode = !mode;
		}
	}
}

function setInterrupt(interrupt) {
	interruptType = interrupt;
}

function getInterrupt() {
	return interruptType;
}

//image pannel
function expand() {
	this.classList.toggle("image-pannel-expand");
	this.classList.toggle("image-pannel");
}

function collapse(e) {
	e.stopPropagation();
	let parent = this.parentNode.parentNode;
	parent.classList.toggle("image-pannel");
	parent.classList.toggle("image-pannel-expand");

	if (parent.dataset.value == "0") {
		let logo = document.getElementById("left-logo");
		///while (logo.firstChild) {
		//find a way to remove this
		logo.removeChild(logo.lastChild);
		//}
		let newLogo = this.cloneNode(true);
		markerOne = newLogo;
		newLogo.classList.remove("player-marker");
		logo.appendChild(newLogo);
	} else {
		let logo = document.getElementById("right-logo");
		//while (logo.firstChild) {
		logo.removeChild(logo.lastChild);
		//}
		let newLogo = this.cloneNode(true);
		markerTwo = newLogo;
		newLogo.classList.remove("player-marker");
		logo.appendChild(newLogo);
	}
}

function startGame() {}

function selectDifficulty() {}

function addMessage() {
	messageBox.innerHTML = gameMessages[getInterrupt()];
	messageBox.style.color = "var(--text-color)";
	/*
	setTimeout(() => {
		messageBox.classList.add("hide-content");
		messageBox.innerText = "";
	}, 10000);
	*/
}

//small problem here but partially closed
function checkDetails() {
	if (playerOne == null) {
		setInterrupt(0);
		messageBox.classList.remove("hide-content");
		return -1;
	}
	if (playerTwo == null) {
		setInterrupt(1);
		messageBox.classList.remove("hide-content");
		return -1;
	}
	return 0;
}

function test() {
	if (checkDetails() != -1) {
		if (playerTurn == 0) {
			markerOne = markerOne.cloneNode(true);
			//while (this.firstChild != null) {
			//console.log(this.lastChild);
			if (this.firstChild) this.removeChild(this.lastChild);
			//}
			this.appendChild(markerOne);
		} else {
			markerTwo = markerTwo.cloneNode(true);
			if (this.firstChild) this.removeChild(this.lastChild);
			this.appendChild(markerTwo);
		}
		playerTurn = ~playerTurn;
	}
}

function getUserDetails() {
	let text = this.value;
	messageBox.innerHTML = "";
	messageBox.classList.add("hide-content");
	if (this.dataset.value == 0) {
		if (text.length > 0) playerOne = text;
		else playerOne = null;
	} else {
		if (text.length > 0) playerTwo = text;
		else playerTwo = null;
	}
}

window.addEventListener("load", pageLoad);

//change modes
const radio = document.getElementById("radio");
radio.addEventListener("click", changeMode);
radio.addEventListener("dragstart", () =>
	radio.addEventListener("dragend", changeMode)
);

//image pannel
const imagePannel = document.querySelectorAll(".image-pannel");
imagePannel.forEach((pannels) => {
	pannels.addEventListener("click", expand);
});
const playerMarker = document.querySelectorAll(".player-marker");
playerMarker.forEach((playerMaker) => {
	playerMaker.addEventListener("click", collapse);
});

//input
const messageBox = document.querySelector(".message-box");
messageBox.addEventListener("animationend", addMessage);
const playerName = document.querySelectorAll(".name-holder");
playerName.forEach((name) => name.addEventListener("change", getUserDetails));

//grid
const grid = document.querySelectorAll(".grid");
grid.forEach((grid) => grid.addEventListener("click", test));
