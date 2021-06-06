// https://www.w3schools.com/howto/howto_js_accordion.asp

class Card {
  constructor(data) {
    // data for the card
    this.data = data;

    // wrapper for the card
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("card");

    // create elements

    this.cardInfo = document.createElement("div");
    this.cardInfo.classList.add("card-info-wrapper");

    // image and info elements
    this.imageWrapper = document.createElement("div");
    this.imageWrapper.classList.add("card-image-wrapper");
    this.infoWrapper = document.createElement("div");
    this.infoWrapper.classList.add("card-info-info-wrapper");

    this.cardInfo.appendChild(this.imageWrapper);
    this.cardInfo.append(this.infoWrapper);

    // product image
    this.image = document.createElement("img");
    this.image.src = data.image;
    this.imageWrapper.appendChild(this.image);

    // product info
    this.infoTop = document.createElement("div");
    this.infoTop.classList.add("card-info-top-wrapper");
    this.infoBottom = document.createElement("div");
    this.infoBottom.classList.add("card-info-bottom-wrapper");

    this.infoWrapper.appendChild(this.infoTop);
    this.infoWrapper.appendChild(this.infoBottom);

    this.productTitle = document.createElement("div");
    this.productTitle.innerHTML = `<span class="product-info-description">Product title: </span> ${data.title}`;
    this.productPrice = document.createElement("div");
    this.productPrice.innerHTML = `<span class="product-info-description">Product price: </span> ${data.price}`;
    this.productRating = document.createElement("div");
    this.productRating.innerHTML = `<span class="product-info-description">Rating: </span> ${data.rating}`;

    this.infoTop.appendChild(this.productTitle);
    this.infoTop.appendChild(this.productPrice);
    this.infoTop.appendChild(this.productRating);

    this.productDescription = document.createElement("div");
    this.productDescription.classList.add("product-description");
    this.productDescription.innerHTML = data.description;

    this.infoBottom.appendChild(this.productDescription);

    this.commentsInfo = document.createElement("div");

    this.viewCommentsButton = document.createElement("div");
    this.viewCommentsButton.innerText = "View comments";

    this.comments = document.createElement("div");

    // add funct

    this.formatData();
    this.viewComments();

    // apend everything

    this.commentsInfo.appendChild(this.viewCommentsButton);
    this.commentsInfo.appendChild(this.comments);

    this.wrapper.appendChild(this.cardInfo);
    this.wrapper.appendChild(this.commentsInfo);
  }

  formatData() {
    // To be modify when integrated with back-end
    for (let i = 0; i < 5; i++) {
      let comment = document.createElement("div");
      comment.innerText = this.data;
      comment.classList.add("comment");
      this.comments.appendChild(comment);
    }
  }

  viewComments() {
    this.viewCommentsButton.classList.add("accordion");
    this.comments.classList.add("panel");

    this.viewCommentsButton.addEventListener("click", () => {
      this.viewCommentsButton.classList.toggle("active");

      if (this.comments.style.display == "block") {
        this.comments.style.display = "none";
      } else {
        this.comments.style.display = "block";
        console.log("Afisat");
      }
    });
  }

  card() {
    return this.wrapper;
  }
}
