// import printMe from "./print.js"
import "./style.css"
import img from "./images/background.jpg"
// console.log(css)
/* function componment() {
	var element = document.createElement("p")
	element.innerHTML = "awesome"

	return element
} */
console.log(img)

let [a, b, c] = [1, 2, 3]
console.log(`a:${a} b:${b} c:${c}`)

// document.body.appendChild(componment());
if (module.hot) {
	module.hot.accept("./print.js", function() {
		// document.body.appendChild("<p>awesome</p>");
	})
}