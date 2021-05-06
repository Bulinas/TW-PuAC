// create header and add style
let header = document.createElement("div");
header.classList.add("header");

// logo
let img = document.createElement("img");
img.src = "./components/logo.png";
img.classList.add("imgStyle");

// button items
let buttonItems = document.createElement("button");
buttonItems.innerText = 'Products';
buttonItems.classList.add('button-header');
buttonItems.setAttribute('href', './main.html');

// button advisers
let buttonAdvisers = document.createElement("button");
buttonAdvisers.innerText = 'Advisers';
buttonAdvisers.classList.add('button-header');
buttonAdvisers.addEventListener('click', function(){
    this.setAttribute('href', './adviser/adviser.html');    // ???????
})

// button settings
let buttonSettings = document.createElement("button");
buttonSettings.innerText = 'Settings';
buttonSettings.classList.add('button-header');
buttonSettings.setAttribute('href', './settings/settings.html');    // ????

// add to header and export
header.appendChild(img);
header.appendChild(buttonItems);
header.appendChild(buttonAdvisers);
header.appendChild(buttonSettings);

export { header };
