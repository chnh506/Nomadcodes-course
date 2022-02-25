const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, newCommentId ) => {
  const commentsList  = document.querySelector(".video__comments ul");

  const newComment = document.createElement("li");
  newComment.dataset.id = newCommentId; 
  newComment.className = "video__comment";  
  
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = '✕';
  
  newComment.appendChild(icon);
  newComment.appendChild(span); 
  newComment.appendChild(span2);
  commentsList.prepend(newComment); 
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  let text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "" || text.trim() === "") {
    return;
  }
  text = text.trim();
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      // headers: request에 추가할 수 있는 정보를 담는다. 
      "Content-type": "application/json",
      // express에게 우리가 보내고 있는 것은 json이라고 알리는 것.
    },
    body: JSON.stringify({ text }),
  }); 
  
  const status = response.status;
  if (status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }

  // window.location.reload();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
