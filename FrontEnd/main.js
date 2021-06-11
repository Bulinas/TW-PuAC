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

exportCsv.addEventListener("click", () => {
  get("http://localhost:5000/products", (status, response) => {
    if (status == 200) {
      transformToCSV(JSON.parse(response));
    } else {
      console.log("ERROR WHILE GETTING ALL THE PRODUCTS");
      console.log(response);
    }
  });
});

function transformToCSV(data) {
  // https://code-maven.com/create-and-download-csv-with-javascript
  // https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
  let items = data;
  let replacer = (key, value) => (value === null ? "" : value);
  let header = Object.keys(items[0]);
  let csv = [
    header.join(","),
    ...items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    ),
  ].join("\r\n");

  console.log(csv);

  let hiddenItem = document.createElement("a");
  hiddenItem.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenItem.target = "_blank";
  hiddenItem.download = "products.csv";
  hiddenItem.click();
}

exportPdf.addEventListener("click", () => {
  get("http://localhost:5000/products", (status, response) => {
    if (status == 200) {
      transformToPDF(JSON.parse(response));
    } else {
      console.log("ERROR WHILE GETTING ALL THE PRODUCTS");
      console.log(response);
    }
  });
});

function transformToPDF(data) {
  let hiddenItem = document.createElement("div");
  hiddenItem.innerText = JSON.stringify(data);

  getPDFFile(hiddenItem, "Products");
}

function getPDFFile(el, title) {
  //https://stackoverflow.com/questions/18191893/generate-pdf-from-html-in-div-using-javascript
  let mywindow = window.open("", "PRINT");

  mywindow.document.write(`<html><head><title>${title}</title>`);
  mywindow.document.write("</head><body >");
  mywindow.document.write(el.innerHTML);
  mywindow.document.write("</body></html>");

  mywindow.document.close();
  mywindow.focus();

  mywindow.print();
  mywindow.close();
}

wraper.appendChild(labelSort);
