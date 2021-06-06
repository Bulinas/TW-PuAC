// get the create product modal

let createProductModal = document.getElementById("create-product-modal");
let span = document.getElementsByClassName("close")[0];

let image = document.getElementById("uploaded-photo-view");
let titleInput = document.getElementById("new-product-title");
let priceInput = document.getElementById("new-product-price");
let descriptionInput = document.getElementById("new-product-description");
let imageInput = document.getElementById("input-image");

let imageSrc;

function createProduct() {
  createProductModal.style.display = "flex";
  createProductModal.classList.add("flex-center");
}

function resetInputs() {
  image.src =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png";
  titleInput.value = "";
  priceInput.value = 9.99;
  descriptionInput.value = "";
  imageInput.value = "";
}

function createProductRequest() {
  let newProductObject = {
    title: titleInput.value,
    price: priceInput.value,
    description: descriptionInput.value,
    image: image.src,
  };

  post(
    "http://localhost:5000/products",
    newProductObject,
    (status, response) => {
      if (status == 201) {
        resetInputs();
        closeCreateProductModal();

        let newProduct = JSON.parse(response);
        let card = new Card(newProduct);
        cardsWrapper.appendChild(card.card());
      } else {
        console.log("ERROR WHILE CREATING PRODUCT");
        console.log(response);
      }
    }
  );
}

function closeCreateProductModal() {
  createProductModal.style.display = "none";
  createProductModal.classList.remove("flex-center");
  resetInputs();
}

span.onclick = function () {
  closeCreateProductModal();
};

window.onclick = function (event) {
  if (event.target == createProductModal) {
    closeCreateProductModal();
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
function dropHandler(ev) {
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  let file = null;
  if (ev.dataTransfer.items) {
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === "file") {
        file = ev.dataTransfer.items[i].getAsFile();
        break;
      }
    }
  } else {
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      file = ev.dataTransfer.files[i];
      break;
    }
  }
  if (file == null) {
    return;
  }
  selectFile(file);
}

function selectFile(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file, "UTF-8");
  reader.onload = function (evt) {
    image.src = evt.target.result;
  };
  reader.onerror = function (evt) {
    console.log("EROARE");
  };
}

function onFileUploaded(ev) {
  if (!ev || !ev.target || ev.target.files.length == 0) {
    return;
  }
  selectFile(ev.target.files[0]);
}

function dragOverHandler(ev) {
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

function initPage() {
  get("http://localhost:5000/products", (status, response) => {
    if (status == 200) {
      let products = JSON.parse(response);
      for (let product of products) {
        let card = new Card(product);
        cardsWrapper.appendChild(card.card());
      }
    } else {
      console.log("ERROR WHILE GETTING ALL THE PRODUCTS");
      console.log(response);
    }
  });
}

document.addEventListener("DOMContentLoaded", initPage);
