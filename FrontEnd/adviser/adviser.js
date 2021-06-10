if (!isLoggedIn()) {
  location.href = "/login/login.html";
}

// create wraper for content

let wraper = document.getElementById("wraper");

// append header

wraper.appendChild(header);

let adviserCardWrapper = document.createElement("div");
adviserCardWrapper.classList.add("adviser-card-wrapper");

function initPage() {
  get("http://localhost:5000/advisers", (status, response) => {
    if (status == 200) {
      while (adviserCardWrapper.hasChildNodes == true) {
        adviserCardWrapper.remove(adviserCardWrapper.lastElementChild);
      }
      let advisers = JSON.parse(response);
      for (let adviser of advisers) {
        let adviserCard = new Adviser(adviser.name, 2, 2, 2, 2, adviser._id);
        adviserCardWrapper.appendChild(adviserCard.getAdviser());
      }
    } else {
      console.log("ERROR WHILE GETTING ALL THE ADVISERS!");
      console.log(response);
    }
  });
}

wraper.appendChild(adviserCardWrapper);

document.addEventListener("DOMContentLoaded", initPage);
