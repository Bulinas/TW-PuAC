if (!isLoggedIn()) {
  location.href = "/login/login.html";
}

// create wraper for content

let wraper = document.getElementById("wraper");

// append header

wraper.appendChild(header);
