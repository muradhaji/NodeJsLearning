const deleteBlog = () => {
  const deleteButton = document.querySelector('a.delete');

  const { blogid } = deleteButton.dataset;

  fetch(`/blogs/${blogid}`, { method: 'DELETE' })
    .then((response) => response.json())
    .then((data) => {
      const { redirect } = data;
      window.location = redirect;
    })
    .catch((err) => {
      console.log(err);
    });
};

const blogUpdateForm = document.querySelector('form#updateBlog');

if (blogUpdateForm) {
  blogUpdateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const { blogid } = blogUpdateForm.dataset;

    const newFormData = new FormData(blogUpdateForm);

    const newBlogData = new URLSearchParams(newFormData.entries());

    fetch(`/blogs/${blogid}`, {
      method: 'PUT',
      body: newBlogData,
    })
      .then((response) => response.json())
      .then((data) => {
        const { redirect } = data;
        window.location = redirect;
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
