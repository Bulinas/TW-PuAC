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

let exportPdf = document.createElement("div");
let exportCsv = document.createElement("div");

exportPdf.innerText = "Export PDF";
exportCsv.innerText = "Export CSV";

exportPdf.classList.add("export-pdf");
exportCsv.classList.add("export-csv");

wraper.appendChild(exportPdf);
wraper.appendChild(exportCsv);

let labelSort = document.createElement("label");
let sortButton = document.createElement("select");
sortButton.classList.add("sort-button");

function createSortButton() {
  let values = ["A-Z ↓", "A-Z ↑", "Rating ↓", "Rating ↑"];

  sortButton.name = "Sort";
  sortButton.id = "Sort";

  for (let val of values) {
    let option = document.createElement("option");
    option.value = val;
    option.text = val;
    sortButton.appendChild(option);
  }

  labelSort.appendChild(sortButton);
}
createSortButton();

wraper.appendChild(labelSort);
