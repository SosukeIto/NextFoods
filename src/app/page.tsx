'use client';

import React, { useState, useEffect } from 'react';
import PostForm from '@/components/postForm';
import PostList from '@/components/postList';
import { Post } from '@/types/post';
import { insertPost } from '@/modules/insertPost';
import { getAllPosts } from '@/modules/getPosts';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 初期値を空配列に設定
  useEffect(() => {
    const fetchPosts = async () => {
      const postThreads = await getAllPosts();
      console.log(`postThreads: `, postThreads);
      //インターフェイスではdateはstringと定義しているのに謎error 
      setPosts(postThreads);
    };
    fetchPosts();
  }, []);
  const handlePostSubmit = async (newPostData: Post) => {
    insertPost(newPostData);
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
