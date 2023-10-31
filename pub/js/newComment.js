async function newComment(event) {
    event.preventDefault();
  
    const comment_content = document.getElementById("comment").value.trim();
    const url = window.location.toString().split("/");
    const blog_id = url[url.length - 1];
  
    if (comment_content) {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({
          blog_id,
          comment_content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }

  document
    .getElementById("comment-form")
    .addEventListener("submit", newComment);