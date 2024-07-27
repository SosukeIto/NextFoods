'use client';

import React, { useState } from 'react';
import PostForm from '../components/postForm';
import PostList from '../components/postList';
import { Post } from '../types/post';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 初期値を空配列に設定

  const handlePostSubmit = async (newPostData: Post) => {
    console.log(newPostData)
    setPosts([...posts, newPostData]);
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
