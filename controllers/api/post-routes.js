const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id/like', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      post.likes += 1;
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id/dislike', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      post.dislikes += 1;
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

