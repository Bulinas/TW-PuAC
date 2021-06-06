// create header and add style
let header = document.createElement("div");
header.classList.add("header");

let leftButtons = document.createElement("div");
leftButtons.classList.add("left-buttons");

let rightButtons = document.createElement("div");
rightButtons.classList.add("right-buttons");

// logo
let img = document.createElement("img");
img.src = "/components/logo.png";
img.classList.add("imgStyle");

// button items
let buttonItems = document.createElement("a");
buttonItems.innerText = "Products";
buttonItems.classList.add("button-header");
buttonItems.setAttribute("href", "/index.html");

// button advisers
let buttonAdvisers = document.createElement("a");
buttonAdvisers.innerText = "Advisers";
buttonAdvisers.classList.add("button-header");
buttonAdvisers.setAttribute("href", "/adviser/adviser.html");

// button settings
let buttonSettings = document.createElement("a");
buttonSettings.innerText = "Settings";
buttonSettings.classList.add("button-header");
buttonSettings.setAttribute("href", "/settings/settings.html"); // ????

// login
let buttonLogin = document.createElement("a");
buttonLogin.innerText = "Logout";
buttonLogin.classList.add("button-header");
buttonLogin.onclick = () => {
  logout();
};

// add to header and export
leftButtons.appendChild(img);
leftButtons.appendChild(buttonItems);
leftButtons.appendChild(buttonAdvisers);
leftButtons.appendChild(buttonSettings);

rightButtons.appendChild(buttonLogin);

header.appendChild(leftButtons);
header.appendChild(rightButtons);
