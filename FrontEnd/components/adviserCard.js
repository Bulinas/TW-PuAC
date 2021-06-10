class Adviser {
  constructor(
    name,
    numberOfComments,
    worstRating,
    bestRating,
    averageRating,
    id
  ) {
    this.id = id;
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("adviser-card");

    this.infoWrapper = document.createElement("div");
    this.infoWrapper.classList.add("adviser-card-info-wrapper");

    this.adviserName = document.createElement("div");
    this.adviserCommentsNumber = document.createElement("div");
    this.adviserWorstRating = document.createElement("div");
    this.adviserBestRating = document.createElement("div");
    this.adviserAverageRating = document.createElement("div");

    this.deleteButton = document.createElement("div");
    this.deleteButton.classList.add("adviser-delete-button");

    this.adviserName.innerText = "Name: " + name;
    this.adviserCommentsNumber.innerText =
      "Total comments: " + numberOfComments;
    this.adviserWorstRating.innerText = "Worst rating: " + worstRating;
    this.adviserBestRating.innerText = "Best rating: " + bestRating;
    this.adviserAverageRating.innerText = "Average rating: " + averageRating;
    this.deleteButton.innerText = "x";

    const that = this;

    this.deleteButton.addEventListener("click", function () {
      that.deleteCard();
    });

    this.infoWrapper.appendChild(this.adviserName);
    this.infoWrapper.appendChild(this.adviserCommentsNumber);
    this.infoWrapper.appendChild(this.adviserWorstRating);
    this.infoWrapper.appendChild(this.adviserBestRating);
    this.infoWrapper.appendChild(this.adviserAverageRating);
    this.infoWrapper.appendChild(this.deleteButton);

    this.wrapper.appendChild(this.infoWrapper);
  }

  deleteCard() {
    console.log(this.id);
    deleteObj(
      "http://localhost:5000/advisers/" + this.id,
      (status, response) => {
        if (status == 202) {
          //initPage();
          document.location.reload(true);
        } else {
          console.log("ERROR WHILE DELETING ADVISER!");
          console.log(response);
        }
      }
    );
  }

  getAdviser() {
    return this.wrapper;
  }
}
