import React, { useEffect, useState } from 'react';
import api from '../api/api';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  async function loadPosts(){
    const res = await api.get('/posts');
    setPosts(res.data);
  }

  useEffect(()=>{ loadPosts(); }, []);

  return (
    <div className="feed">
      {user ? <CreatePost onPosted={loadPosts} user={user} /> : <p>Please login to post.</p>}
      <div className="posts">
        {posts.map(p => <PostCard key={p._id} post={p} onUpdated={loadPosts} currentUser={user} />)}
      </div>
    </div>
  );
}
