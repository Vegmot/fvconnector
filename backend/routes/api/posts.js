import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import { auth } from '../../middleware/auth.js';
import User from '../../models/User.js';
import Post from '../../models/Post.js';

// POST api/posts
// Create a post
// private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// GET api/posts
// Get all posts
// private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// GET api/posts/:id
// Get a post by id
// private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// DELETE api/posts/:id
// Delete a post
// private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await post.remove();

    res.json({ msg: 'Successfully deleted the post' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// PUT api/posts/like/:id
// Like a post
// private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if the post has already been liked before
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'You already liked this post' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// PUT api/posts/unlike/:id
// unlike a post
// private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    // unlike
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// PUT api/posts/dislike/:id
// Disike a post
// private
router.put('/dislike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if the post has already been disliked before
    if (
      post.dislikes.filter(dislike => dislike.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'You already disliked this post' });
    }

    post.dislikes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.dislikes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// PUT api/posts/undislike/:id
// undislike a post
// private
router.put('/undislike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // get remove index
    const removeIndex = post.dislikes
      .map(dislike => dislike.user.toString())
      .indexOf(req.user.id);

    // unlike
    post.dislikes.splice(removeIndex, 1);

    await post.save();
    res.json(post.dislikes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// POST api/posts/comments/:id
// Create a comment on a post
// private
router.post(
  '/comments/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.push(newComment);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// DELETE api/posts/comments/:id/:comment_id
// Delete a comment on a post
// private
router.delete('/comments/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // make sure the comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // get remove Index
    const removeIndex = post.comments
      .map(comm => comm.id)
      .indexOf(req.params.comment_id);

    // remove comment
    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
