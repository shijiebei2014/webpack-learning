import printMe from './print.js';
import "./style.css";
// console.log(css)
function componment() {
	var element = document.createElement('p');
	element.innerHTML = 'awesome';

	return element
}
// document.body.appendChild(componment());
if (module.hot) {
	module.hot.accept('./print.js', function() {
		// document.body.appendChild("<p>awesome</p>");
	})
}
