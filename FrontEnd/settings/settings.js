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
      let resp = JSON.parse(response);
      console.log(resp);
      let respElement = document.getElementById("settings-response");
      respElement.innerText = "http://localhost:8090/" + resp.randomURL;
    } else {
      console.log("ERROR WHILE ADDING ADVISER");
      console.log(response);
    }
  });
}
