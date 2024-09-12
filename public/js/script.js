document.addEventListener('DOMContentLoaded', () => {
  const postBtn = document.getElementById('postBtn');
  const postInput = document.getElementById('postInput');
  const postsContainer = document.getElementById('posts');

  if (postBtn && postInput && postsContainer) {
      postBtn.addEventListener('click', async () => {
          const postContent = postInput.value.trim();

          if (postContent) {
              try {
                  const response = await fetch('/api/posts', {
                      method: 'POST',
                      body: JSON.stringify({ content: postContent }),
                      headers: { 'Content-Type': 'application/json' },
                  });

                  if (response.ok) {
                      const newPost = await response.json();
                      addPost(newPost);
                      postInput.value = '';
                  } else {
                      alert('Failed to create post');
                  }
              } catch (error) {
                  console.error('Error:', error);
              }
          }
      });

      async function addPost(post) {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          
          postElement.innerHTML = `
              <div class="post-content">${post.content}</div>
              <div class="actions">
                  <span class="likes">Likes: ${post.likes || 0}</span>
                  <button class="like-btn" data-id="${post.id}">Like</button>
                  <button class="dislike-btn" data-id="${post.id}">Dislike</button>
                  <button class="comment-btn" data-id="${post.id}">Comment</button>
              </div>
              <div class="comment-section">
                  <textarea placeholder="Write a comment..."></textarea>
                  <button class="add-comment-btn" data-id="${post.id}">Add Comment</button>
                  <div class="comments"></div>
              </div>
          `;

          postsContainer.prepend(postElement);

          const addCommentBtn = postElement.querySelector('.add-comment-btn');
          const commentInput = postElement.querySelector('.comment-section textarea');
          const commentsContainer = postElement.querySelector('.comments');

          if (addCommentBtn && commentInput && commentsContainer) {
              addCommentBtn.addEventListener('click', async () => {
                  const commentContent = commentInput.value.trim();

                  if (commentContent) {
                      try {
                          const response = await fetch('/api/comments', {
                              method: 'POST',
                              body: JSON.stringify({
                                  content: commentContent,
                                  post_id: post.id,
                              }),
                              headers: { 'Content-Type': 'application/json' },
                          });

                          if (response.ok) {
                              const newComment = await response.json();
                              addComment(commentsContainer, newComment);
                              commentInput.value = '';
                          } else {
                              alert('Failed to add comment');
                          }
                      } catch (error) {
                          console.error('Error:', error);
                      }
                  }
              });
          }
      }

      function addComment(commentsContainer, comment) {
          const commentElement = document.createElement('div');
          commentElement.classList.add('comment');

          commentElement.innerHTML = `
              <div class="comment-content">${comment.content}</div>
              <div class="actions">
                  <span class="likes">Likes: ${comment.likes || 0}</span>
                  <button class="like-btn" data-id="${comment.id}">Like</button>
                  <button class="dislike-btn" data-id="${comment.id}">Dislike</button>
              </div>
          `;

          commentsContainer.appendChild(commentElement);
      }

      // Fetch and display existing posts
      async function fetchPosts() {
          try {
              const response = await fetch('/api/posts');
              if (response.ok) {
                  const posts = await response.json();
                  posts.forEach(addPost);
              } else {
                  console.error('Failed to fetch posts');
              }
          } catch (error) {
              console.error('Error:', error);
          }
      }

      fetchPosts();
  } else {
      console.error('One or more required elements are missing from the DOM');
  }
});
