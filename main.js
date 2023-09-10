let mode = true;
const root = document.documentElement;
const imagePannel = document.querySelectorAll(".image-pannel");

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
		while (logo.firstChild) logo.removeChild(logo.lastChild);
		let newLogo = this.cloneNode(true);
		newLogo.classList.remove("player-marker");
		logo.appendChild(newLogo);
	} else {
		let logo = document.getElementById("right-logo");
		while (logo.firstChild) logo.removeChild(logo.lastChild);
		let newLogo = this.cloneNode(true);
		newLogo.classList.remove("player-marker");
		logo.appendChild(newLogo);
	}
}

function startGame() {}

function selectDifficulty() {}

const radio = document.getElementById("radio");
radio.addEventListener("click", changeMode);
radio.addEventListener("dragstart", () =>
	radio.addEventListener("dragend", changeMode)
);

imagePannel.forEach((pannels) => {
	pannels.addEventListener("click", expand);
});

const playerMarker = document.querySelectorAll(".player-marker");
playerMarker.forEach((playerMaker) => {
	playerMaker.addEventListener("click", collapse);
});

function test() {
	this.textContent = "X";
	console.log("hello world");
}
const tabs = document.querySelectorAll(".tabs");
console.log(tabs);

tabs.forEach((tab) => {
	addEventListener("click", test);
});

const grid = document.querySelectorAll(".grid");
grid.forEach((grid) => grid.addEventListener("click", test));
