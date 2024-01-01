const search = new URLSearchParams(location.search);
for (const element of document.getElementsByTagName("input")) {
	element.value = search.get(element.getAttribute("name") ?? "") ?? "";
}

const [[x1, y1], [x2, y2]] = /** @type {const} */ ([
	[+(search.get("x1") ?? NaN), +(search.get("y1") ?? NaN)],
	[+(search.get("x2") ?? NaN), +(search.get("y2") ?? NaN)],
]).toSorted(([one], [two]) => one - two);

if ([x1, y1, x2, y2].includes(NaN))
	throw new TypeError("Some points were not specified");

const canvas = document.querySelector("canvas");
if (!(canvas instanceof HTMLCanvasElement))
	throw new ReferenceError("Missing canvas element");
const context = canvas.getContext("2d");
if (!context) throw new ReferenceError("Could not get canvas context");

if (x1 === x2) {
	for (let y = y1; y <= y2; y++)
		context.fillRect(x1, y, 2, 2);
} else {
	const slope = (y2 - y1) / (x2 - x1);
	const intercept = y1 - slope * x1 - 500;
	for (let x = x1; x <= x2; x++)
		context.fillRect(x, Math.abs(slope * x + intercept), 2, 2);
}
