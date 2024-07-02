"use client";
import React, { useState, FormEvent } from 'react';
import Image from 'next/image';

interface Post {
  id: number;
  name: string;
  content: string;
  imageUrl?: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostName, setNewPostName] = useState<string>('');
  const [newPostImage, setNewPostImage] = useState<File | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newPostData: Post = {
      id: posts.length + 1,
      name: newPostName,
      content: newPostContent,
      imageUrl: newPostImage ? URL.createObjectURL(newPostImage) : undefined
    };

    setPosts([...posts, newPostData]);
    setNewPostContent('');
    setNewPostName('');
    setNewPostImage(null);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>みんなのご飯録</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
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
            accept="image/*"
            onChange={(e) => setNewPostImage(e.target.files ? e.target.files[0] : null)}
            style={{ padding: '5px', marginTop: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>投稿</button>
      </form>

      <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <p>{post.name}</p>
            <p>{post.content}</p>
            {post.imageUrl && (
              <Image
                src={post.imageUrl}
                alt={`Post ${post.id}`}
                width={500}  // ここに幅を指定
                height={500} // ここに高さを指定
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
