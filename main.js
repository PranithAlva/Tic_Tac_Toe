console.log("hello world");

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
