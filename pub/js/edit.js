const editBlog = async (event) => {
    event.preventDefault();
  
    let blogId = event.target.getAttribute("data-id");

    document.location.replace(`/create/${blogId}`);
};
  
const editButton = document.querySelectorAll("#editBtn");
  
for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener("click", editBlog);
};