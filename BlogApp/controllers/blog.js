const { Blog } = require('../models');
const jwt = require('jsonwebtoken');

const view_all = (req, res) => {
  Blog.find()
    .where('createdBy')
    .equals(res.locals.user._id)
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
    .where('createdBy')
    .equals(res.locals.user._id)
    .then((result) => {
      if (result) {
        res.render('blogs/edit', {
          path: req.originalUrl,
          blog: result,
          pageTitle: 'Edit Blog',
        });
      } else {
        res.redirect('/404');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const view_details = (req, res) => {
  const { blogId } = req.params;

  Blog.findById(blogId)
    .where('createdBy')
    .equals(res.locals.user._id)
    .then((result) => {
      if (result) {
        res.render('blogs/details', {
          path: req.originalUrl,
          blog: result,
          pageTitle: 'Blog Details',
        });
      } else {
        res.redirect('/404');
      }
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

  const { id: userId } = jwt.decode(req.cookies.user_jwt);

  Blog.findByIdAndDelete(blogId)
    .where('createdBy')
    .equals(userId)
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

  const { id: userId } = jwt.decode(req.cookies.user_jwt);

  Blog.findByIdAndUpdate(blogId, body)
    .where('createdBy')
    .equals(userId)
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
