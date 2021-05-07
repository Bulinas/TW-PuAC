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


// button login
let buttonLogin = document.createElement("button");
buttonLogin.innerText = 'Login';
buttonLogin.classList.add('button-header');
buttonLogin.setAttribute('href', './login/login.html');    // ????

// add to header and export
header.appendChild(img);
header.appendChild(buttonItems);
header.appendChild(buttonAdvisers);
header.appendChild(buttonSettings);
header.appendChild(buttonLogin);

export { header };
