if (!isLoggedIn()) {
  location.href = "/login/login.html";
}

// create wraper for content

let wraper = document.getElementById("wraper");

// append header

wraper.appendChild(header);

function adviserRequest() {
  let inp = document.getElementById("settings-inp");

  let obj = {
    name: inp.value,
  };

  inp.value = "";

  console.log(obj);

  post("http://localhost:5000/advisers", obj, (status, response) => {
    if (status == 201) {
      console.log(JSON.parse(response));
    } else {
      console.log("ERROR WHILE ADDING ADVISER");
      console.log(response);
    }
  });
}
