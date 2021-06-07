class AddCommentCard {
    constructor(productId, advisorId) {
        this.productId = productId;
        this.advisorId = advisorId; 
        this.wrapper = document.createElement("add-comment-popup-wrapper")
        this.formContainer = document.createElement("form-container");

        //to add labels
        this.commentInput = document.createElement("input");
        this.gradeInput = document.createElement("input");
        this.formContainer.appendChild(this.commentInput);
        this.formContainer.appendChild(this.gradeInput);
        
        this.wrapper.appendChild(this.formContainer);
        this.closeButton = document.createElement("button");
        this.closeButton.classList.add("add-comment-close-button");
        this.closeButton.innerText = "x";
        this.closeButton.addEventListener("click", () => {
            this.hidePopUp();
        })

        this.postButton = document.createElement("button");
        this.postButton.classList.add("add-comment-post-button");
        this.postButton.innerText = "Post comment";
        this.postButton.addEventListener("click", () => {
            this.addComment();
            this.hidePopUp();
            location.reload();
        })
        this.wrapper.appendChild(this.postButton);
        this.wrapper.appendChild(this.closeButton);
    }
    showPopUp() {
        document.querySelector("body").appendChild(this.wrapper);
    }
    hidePopUp() {
        document.querySelector("add-comment-popup-wrapper").remove();
    }
    addComment() {
        let newComment = {
            commentText: this.commentInput.value,
            grade: this.gradeInput.value,
            productId: this.productId,
            advisorId: this.advisorId
        };

        post(
            "http://localhost:5000/comments",
            newComment,
            (status, response) => {
                if (status == 201) {
                    return true;
                } else {
                    console.log("ERROR WHILE REGISTERING");
                    console.log(response);
                    return false;
                }
            }
        );
    }
}