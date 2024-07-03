'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
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
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostName, setNewPostName] = useState<string>('');
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const UploadSubmit = async (formdata: FormData) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}(${['日', '月', '火', '水', '木', '金', '土'][now.getDay()]}) ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newPostData: Post = {
      id: posts.length + 1,
      name: newPostName,
      content: newPostContent,
      imageUrl: newPostImage ? URL.createObjectURL(newPostImage) : undefined,
      date: formattedDate
    };

    setPosts([...posts, newPostData]);
    setNewPostContent('');
    setNewPostName('');
    setNewPostImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    await uploadFile(formdata);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>みんなのご飯録</h1>

      <form action={UploadSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="text"
            value={newPostName}
            onChange={(e) => setNewPostName(e.target.value)}
            placeholder="名前"
            style={{ padding: '5px', width: '300px', marginRight: '10px' }}
          />
        </div>
        <div>
          <input
            type="text"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="あなたが食べたご飯はなに？"
            style={{ padding: '5px', width: '300px', marginRight: '10px' }}
          />
        </div>
        <div>
          <input
            type="file"
            name="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setNewPostImage(e.target.files ? e.target.files[0] : null)}
            style={{ padding: '5px', marginTop: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>投稿</button>
      </form>

      <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <p>名前 : {post.name} ： {post.date}</p>
            <p>{post.content}</p>
            {post.imageUrl && (
              <Image
                src={post.imageUrl}
                alt={`Post ${post.id}`}
                width={500}
                height={500}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;