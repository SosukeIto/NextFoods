'use client';

import React, { useState } from 'react';
import PostForm from '../components/postForm';
import PostList from '../components/postList';
import { uploadFile } from './actions';

interface Post {
  id: number;
  name: string;
  content: string;
  imageUrl?: string;
  date: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostSubmit = async (formdata: FormData, newPostData: Post) => {
    setPosts([...posts, newPostData]);
    await uploadFile(formdata);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>みんなのご飯録</h1>
      <PostForm onPostSubmit={handlePostSubmit} />
      <PostList posts={posts} />
    </div>
  );
};

export default HomePage;
