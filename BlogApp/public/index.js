const handleCustomErr = ({ message, fieldMessages }) => {
  if (message) {
    alert(message);
  } else {
    fieldMessages.forEach((field) => {
      alert(field.message);
    });
  }
};

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

const signupForm = document.querySelector('form#signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(signupForm);

    const signupData = new URLSearchParams(formData.entries());

    fetch('/signup', {
      method: 'POST',
      body: signupData,
    })
      .then(async (result) => {
        const jsonData = await result.json();
        if (result.status === 400) {
          handleCustomErr(jsonData);
        } else {
          console.log(jsonData);
          location.assign('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

const loginForm = document.querySelector('form#loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (result) => {
        const jsonData = await result.json();
        if (result.status === 400) {
          handleCustomErr(jsonData);
        } else {
          console.log(jsonData);
          location.assign('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
