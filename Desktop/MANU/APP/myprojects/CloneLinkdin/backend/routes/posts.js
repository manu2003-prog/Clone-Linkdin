const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const router = express.Router();

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    if (!text) return res.status(400).json({ message: 'Post text required' });

    const post = new Post({
      author: req.user.userId,
      authorName: req.user.name,
      text,
      imageUrl
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts (latest first)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(100).populate('author', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit post (only owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.author.toString() !== req.user.userId) return res.status(403).json({ message: 'Forbidden' });

    post.text = req.body.text ?? post.text;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.author.toString() !== req.user.userId) return res.status(403).json({ message: 'Forbidden' });

    await post.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/unlike
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });

    const idx = post.likes.findIndex(l => l.toString() === req.user.userId);
    if (idx === -1) post.likes.push(req.user.userId);
    else post.likes.splice(idx, 1);

    await post.save();
    res.json({ likesCount: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
