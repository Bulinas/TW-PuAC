// create header and add style
let header = document.createElement("div");
header.classList.add("header");

// logo
let img = document.createElement("img");
img.src = "./components/logo.png";
img.classList.add("imgStyle");

// button items
let buttonItems = document.createElement("button");

// button advisers
let buttonAdvisers = document.createElement("button");

// button settings
let buttonSettings = document.createElement("button");

// add to header and export
header.appendChild(img);
header.appendChild(buttonItems);
header.appendChild(buttonAdvisers);
header.appendChild(buttonSettings);

export { header };
