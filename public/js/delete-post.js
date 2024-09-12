document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const postId = event.target.dataset.id;
  
      if (confirm('Are you sure you want to delete this question?')) {
        try {
          const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            document.location.reload();
          } else {
            alert('Failed to delete question');
          }
        } catch (err) {
          console.error('Error:', err);
          alert('Failed to delete question');
        }
      }
    });
  });