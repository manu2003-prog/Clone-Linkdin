import React, { useState } from 'react';
import api from '../api/api';

export default function CreatePost({ onPosted }) {
  const [text, setText] = useState('');

  async function submit(e){
    e.preventDefault();
    try {
      await api.post('/posts', { text });
      setText('');
      onPosted();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to post');
    }
  }

  return (
    <form onSubmit={submit} className="create-post">
      <textarea placeholder="What's happening?" value={text} onChange={e=>setText(e.target.value)} />
      <button type="submit">Post</button>
    </form>
  );
}
