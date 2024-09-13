const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id/like', withAuth, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      comment.likes += 1;
      await comment.save();
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id/dislike', withAuth, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      comment.dislikes += 1;
      await comment.save();
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
