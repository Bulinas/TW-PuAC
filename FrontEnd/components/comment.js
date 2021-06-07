class Comment{
    constructor(commentData){
        this.commentData = commentData;
        this.commentContainer = document.createElement("comment");
        
        this.commentText = document.createElement("commentText");
        this.commentText.innerText = this.commentData.comment;
        
        this.infoContainer = document.createElement("infoContainer");

        this.grade = document.createElement("grade");
        this.grade.innerText = this.commentData.grade;

        this.advisor = document.createElement("advisor");
        this.advisor.innerText = this.commentData.advisor_name;

        this.infoContainer.appendChild(this.advisor);
        this.infoContainer.appendChild(this.grade)
        this.commentContainer.appendChild(this.infoContainer);
        this.commentContainer.appendChild(this.commentText);
    }
}