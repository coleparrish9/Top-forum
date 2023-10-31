const deleteBlog = async (event) => {
    event.preventDefault();
  
    let blogId = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blog/${blogId}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      document.location.assign(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  };
   
  const deleteButton = document.querySelectorAll("#deleteBtn");
  
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deleteBlog);
  };