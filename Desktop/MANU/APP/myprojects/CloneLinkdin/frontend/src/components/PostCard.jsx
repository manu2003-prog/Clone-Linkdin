import React from 'react';
import api from '../api/api';

export default function PostCard({ post, onUpdated, currentUser }) {
  async function handleDelete() {
    if (!confirm('Delete this post?')) return;
    await api.delete(`/posts/${post._id}`);
    onUpdated();
  }
  async function toggleLike(){
    await api.post(`/posts/${post._id}/like`);
    onUpdated();
  }

  const isOwner = currentUser && post.author && currentUser.id === post.author;

  return (
    <div className="post-card">
      <div className="post-head">
        <strong>{post.authorName || post.author?.name}</strong>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
      <p>{post.text}</p>
      <div className="post-actions">
        <button onClick={toggleLike}>Like ({post.likes?.length || 0})</button>
        {isOwner && <button onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  );
}
