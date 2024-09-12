const router = require('express').Router();
const userRoutes = require('./user-routes');
const path = require('path');
const postRoutes = require(path.resolve(__dirname, 'post-routes'));
const commentRoutes = require(path.resolve(__dirname, 'comment-routes'));

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;