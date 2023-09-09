let mode = true;
const root = document.documentElement;
function changeMode() {
	//direction and enable the corrosponding animation
	//variable to see in which mode

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

function expand() {
	this.classList.add("image-pannel-expand");
	this.classList.remove("image-pannel");
}

function startGame() {}

function selectDifficulty() {}

const radio = document.getElementById("radio");
radio.addEventListener("click", changeMode);

const imagePannel = document.querySelectorAll(".image-pannel");
imagePannel.forEach((pannels) => {
	pannels.addEventListener("click", expand);
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
