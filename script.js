// ? Open up the console to see this log
console.log("Your external JavaScript file is linked 🎉");
// Get elements
const postBtn = document.getElementById('postBtn');
const postInput = document.getElementById('postInput');
const postsContainer = document.getElementById('posts');

// Event listener for creating a post
postBtn.addEventListener('click', () => {
  const postContent = postInput.value.trim();

  if (postContent) {
    addPost(postContent);
    postInput.value = ''; // Clear input after posting
  }
});

// Function to create and display a post
function addPost(content) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');
  
  postElement.innerHTML = `
    <div class="post-content">${content}</div>
    <div class="actions">
      <span class="likes">Likes: 0</span>
      <button class="like-btn">Like</button>
      <button class="dislike-btn">Dislike</button>
      <button class="comment-btn">Comment</button>
    </div>
    <div class="comment-section">
      <textarea placeholder="Write a comment..."></textarea>
      <button class="add-comment-btn">Add Comment</button>
      <div class="comments"></div>
    </div>
  `;

  // Add post to the container
  postsContainer.prepend(postElement);

  // Event listeners for like, dislike, and comment actions
  const likeBtn = postElement.querySelector('.like-btn');
  const dislikeBtn = postElement.querySelector('.dislike-btn');
  const addCommentBtn = postElement.querySelector('.add-comment-btn');
  const commentInput = postElement.querySelector('.comment-section textarea');
  const commentsContainer = postElement.querySelector('.comments');
  let likesCount = 0;

  likeBtn.addEventListener('click', () => {
    likesCount++;
    postElement.querySelector('.likes').innerText = ⁠ Likes: ${likesCount} ⁠;
  });

  dislikeBtn.addEventListener('click', () => {
    if (likesCount > 0) {
      likesCount--;
      postElement.querySelector('.likes').innerText = ⁠ Likes: ${likesCount} ⁠;
    }
  });

  addCommentBtn.addEventListener('click', () => {
    const commentContent = commentInput.value.trim();

    if (commentContent) {
      addComment(commentsContainer, commentContent);
      commentInput.value = '';
    }
  });
}

// Function to create and display a comment
function addComment(commentsContainer, content) {
  const commentElement = document.createElement('div');
  commentElement.classList.add('comment');

  commentElement.innerHTML = `
    <div class="comment-content">${content}</div>
    <div class="actions">
      <span class="likes">Likes: 0</span>
      <button class="like-btn">Like</button>
      <button class="dislike-btn">Dislike</button>
    </div>
  `;

  commentsContainer.appendChild(commentElement);

  // Like and dislike buttons for comments
  const likeBtn = commentElement.querySelector('.like-btn');
  const dislikeBtn = commentElement.querySelector('.dislike-btn');
  let likesCount = 0;

  likeBtn.addEventListener('click', () => {
    likesCount++;
    commentElement.querySelector('.likes').innerText = ⁠ Likes: ${likesCount} ⁠;
  });

  dislikeBtn.addEventListener('click', () => {
    if (likesCount > 0) {
      likesCount--;
      commentElement.querySelector('.likes').innerText = ⁠ Likes: ${likesCount} ⁠;
    }
  });
}