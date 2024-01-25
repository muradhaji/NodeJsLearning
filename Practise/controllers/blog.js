const Blog = require('../models/blog');

const view_all = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('blogs/index', { path: req.originalUrl, blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const view_new = (req, res) => {
  res.render('blogs/new', { path: req.originalUrl });
};

const view_edit = (req, res) => {
  const { blogId } = req.params;

  Blog.findById(blogId)
    .then((result) => {
      res.render('blogs/edit', {
        path: req.originalUrl,
        blog: result,
        pageTitle: 'Edit Blog',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const view_details = (req, res) => {
  const { blogId } = req.params;

  Blog.findById(blogId)
    .then((result) => {
      res.render('blogs/details', {
        path: req.originalUrl,
        blog: result,
        pageTitle: 'Blog Details',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const api_create = (req, res) => {
  const { body: blogData } = req;
  const newBlog = new Blog(blogData);

  newBlog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
};
const api_delete = (req, res) => {
  const { blogId } = req.params;

  Blog.findByIdAndDelete(blogId)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
};
const api_update = (req, res) => {
  const { body, params } = req;
  const { blogId } = params;

  Blog.findByIdAndUpdate(blogId, body)
    .then((result) => {
      res.json({
        redirect: `/blogs/${blogId}`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  view_all,
  view_new,
  view_edit,
  view_details,
  api_create,
  api_delete,
  api_update,
};
