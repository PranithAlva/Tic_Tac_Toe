//global variables

//control on root elemetnt
const root = document.documentElement;
let mode = true; //false=night or true=day

let playerOne = null;
let playerTwo = null;
let enableTicy = null;
let difficulty = 0;
//it related to array below
let interruptType = 0;
let checkGridFull = -9;
let playerTurn = 0;
let availableGrids = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//array with messages
const gameMessages = [
	"Please enter <strong style='color:var(--secondary-color)'>player_one</strong>  name",
	"Please enter <strong style='color:var(--secondary-color)'>Player_two</strong> name ",
	0,
	1,
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
	let pannel = document.querySelector(".pannel");
	pannel.classList.add("fade-in");
	setTimeout(() => pannel.classList.remove("fade-in"), 500);
}

function changeMode(e) {
	console.log(playerTwo);
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
//problem here, solution is to check if it has child before removing child
function reset() {
	document.getElementById("right-crown").classList.remvoe("hide-content");
	document.getElementById("left-crown").classList.remove("hide-content");
	playerTurn = 0;
	interruptType = 0;
	checkGridFull = -9;
	availableGrids = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	messageBox.classList.add("hide-cotent");

	grid.forEach((grid) => {
		if (grid.firstChild) grid.removeChild(grid.lastChild);
	});
}

function changeDifficulty() {
	reset();
	//missing other reset as well
	document.querySelector(".menu-pannel").classList.remove("hide-content");
	document.querySelector(".pannel").classList.remove("hide");
	console.log("hello");
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

//work around failed
function startGame() {
	let pannel = document.querySelector(".pannel");

	if (enableTicy == true || enableTicy == false) {
		pannel.classList.add("hide");
		document.querySelector(".menu-pannel").classList.add("hide-content");
	} else {
		pannel.classList.remove("shake");
		pannel.classList.add("shake");
		pannel.style.animationPlayState = "running";
		setTimeout(() => {
			pannel.classList.remove("shake");
		}, 400);
	}
}

function selectDifficulty() {
	document.querySelector(".pannel").classList.toggle("hide");
	document.querySelector(".modes").classList.toggle("hide");
}

function setDifficulty() {
	switch (this.dataset.value) {
		case "0":
			difficulty = 0;
			console.log(difficulty);
			break;
		case "1":
			difficulty = 1;
			console.log(difficulty);
			break;
		default:
	}
	selectDifficulty();
}

function setPlayerMode() {
	switch (this.dataset.value) {
		case "1":
			enableTicy = false;
			break;
		case "2":
			enableTicy = true;
			selectDifficulty();
			break;
		default:
			startGame();
	}
}

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

function checkThreeDashed(position, value, color) {
	//0 1 2=>n%3,n/3
	//3 4 5=>n%3,n/3
	//6 7 8=>n%3,n/3
	//middle case
	//corner case
	console.log("position" + position);
	row = parseInt(position / 3, 10);
	console.log(row);
	console.log(row);
	let dashed = 0;

	//row
	dashed =
		dashed ||
		(availableGrids[3 * row] == value &&
			availableGrids[3 * row + 1] == value &&
			availableGrids[3 * row + 2] == value);
	console.log("row" + dashed);
	if (dashed) {
		document.querySelector(`.grid[data-value~="${3 * row}"]`).style.background =
			color;
		document.querySelector(
			`.grid[data-value~="${3 * row + 1}"]`
		).style.background = color;
		document.querySelector(
			`.grid[data-value~="${3 * row + 2}"]`
		).style.background = color;
		return dashed;
	}
	//columns
	let column = position % 3;
	dashed =
		dashed ||
		(availableGrids[column] == value &&
			availableGrids[column + 3] == value &&
			availableGrids[column + 6] == value);
	if (dashed) {
		document.querySelector(`.grid[data-value~="${column}"]`).style.background =
			color;
		document.querySelector(
			`.grid[data-value~="${column + 3}"]`
		).style.background = color;
		document.querySelector(
			`.grid[data-value~="${column + 6}"]`
		).style.background = color;
		return dashed;
	}
	console.log("column" + dashed);
	//diagonal1;
	if (!(position % 4)) {
		dashed =
			dashed ||
			(availableGrids[0] == value &&
				availableGrids[4] == value &&
				availableGrids[8] == value);
	}
	if (dashed) {
		document.querySelector('.grid[data-value~="0"]').style.background = color;
		document.querySelector('.grid[data-value~="4"]').style.background = color;
		document.querySelector('.grid[data-value~="8"]').style.background = color;
		return dashed;
	}
	console.log("diagonal" + dashed);
	//diagonal2
	if (!(position % 2)) {
		dashed =
			dashed ||
			(availableGrids[2] == value &&
				availableGrids[4] == value &&
				availableGrids[6] == value);
	}
	if (dashed) {
		document.querySelector('.grid[data-value~="2"]').style.background = color;
		document.querySelector('.grid[data-value~="4"]').style.background = color;
		document.querySelector('.grid[data-value~="6"]').style.background = color;
		return dashed;
	}
	return 0;
}

function playComputerMove() {
	playerTurn = ~playerTurn;
	/*switch()*/
	let random = Math.floor(Math.random() * availableGrids.length);
	let index = 0;
	while (random > -1) {
		if (availableGrids[index % 9] >= 0) random--;
		index++;
	}
	index--;
	index %= 9;
	availableGrids[index] = -2;
	console.log(availableGrids);
	selectedGrid = document.querySelector(`.grid[data-value~="${index}"]`);
	markerTwo = markerTwo.cloneNode(true);
	if (selectedGrid.firstChild) selectedGrid.removeChild(selectedGrid.lastChild);
	selectedGrid.appendChild(markerTwo);
	checkGridFull++;
	if (checkThreeDashed(index, -2, "#ec4899")) {
		checkGridFull = 0;
		setInterrupt(4);
		messageBox.classList.toggle("hide-content");
		//addMessage();
		displayCrown = 1;
	}

	//
}

function test() {
	if (
		checkDetails() != -1 &&
		availableGrids.includes(Number(this.dataset.value)) &&
		checkGridFull
	) {
		console.log("yolo" + this.dataset.value);
		if (playerTurn == 0) {
			markerOne = markerOne.cloneNode(true);
			//while (this.firstChild != null) {
			//console.log(this.lastChild);
			if (this.firstChild) this.removeChild(this.lastChild);
			//}
			this.appendChild(markerOne);
			availableGrids[this.dataset.value] = -1;
			console.log("qen" + availableGrids);
			checkGridFull++;
			if (checkThreeDashed(Number(this.dataset.value), -1, "#2ECC71")) {
				checkGridFull = 0;
				displayCrown(0);
				setInterrupt(2);
				messageBox.classList.toggle("hide-content");
				//addMessage();
				return;
			}
			if (checkGridFull && enableTicy) playComputerMove();
		} else {
			markerTwo = markerTwo.cloneNode(true);
			if (this.firstChild) this.removeChild(this.lastChild);
			this.appendChild(markerTwo);
			checkGridFull++;
			availableGrids[this.dataset.value] = -2;
			if (
				checkThreeDashed(
					Number(this.dataset.value),
					-2,
					"#2ECC71" /* "#d62976"*/
				)
			) {
				checkGridFull = 0;
				setInterrupt(3);
				messageBox.classList.toggle("hide-content");
				//addMessage();
				displayCrown(1);
				return;
			}
			//
		}
		playerTurn = ~playerTurn;
		if (!checkGridFull) {
			setInterrupt(5);
			messageBox.classList.toggle("hide-content");
			//addMessage();
		}
	}
}

function getUserDetails() {
	let text = this.value;
	messageBox.innerHTML = "";
	messageBox.classList.add("hide-content");
	if (this.dataset.value == 0) {
		if (text.length > 0) {
			playerOne = text;
			gameMessages[2] = `Congratulations <strong style='color:var(--secondary-color)'>${this.value}</strong> wins!!`;
		} else playerOne = null;
	} else {
		if (text.length > 0) {
			playerTwo = text;
			gameMessages[3] = `Congratulations <strong style='color:var(--secondary-color)'>"${this.value}"</strong> wins!!`;
		} else playerTwo = null;
	}
}

function displayCrown(winner) {
	if (winner == 0) {
		this.document
			.getElementById("left-crown")
			.classList.toggle("crown-display");
	}
	if (winner == 1) {
		this.document
			.getElementById("right-crown")
			.classList.toggle("crown-display");
	}
}

function easyMode() {}

function ticyMode() {}

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

//control buttons
const restart = document.getElementById("restart");
restart.addEventListener("click", reset);

const difficultyMode = document.getElementById("change-mode");
difficultyMode.addEventListener("click", changeDifficulty);

//menu pannel buttons
const pannelButton = document.querySelectorAll(".pannel-button");
pannelButton.forEach((button) =>
	button.addEventListener("click", setPlayerMode)
);
const difficultyButton = document.querySelectorAll(".difficulty-button");
difficultyButton.forEach((mode) =>
	mode.addEventListener("click", setDifficulty)
);
