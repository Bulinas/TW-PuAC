if (!isLoggedIn()) {
  location.href = "/login/login.html";
}

// create wraper for content

let wraper = document.getElementById("wraper");

// append header

wraper.appendChild(header);

//  append cards

let cardsWrapper = document.createElement("div");
cardsWrapper.classList.add("card-wrapper");

wraper.appendChild(cardsWrapper);
