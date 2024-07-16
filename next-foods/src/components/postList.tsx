import React, { useState } from 'react';
import Image from 'next/image';
import ReplyList from './reply/replyList'
interface Post {
    id: number;
    name: string;
    content: string;
    imageUrl?: string;
    date: string;
}
interface PostListProps {
    posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    const [replys, setReplys] = useState<Post[]>([]);

    return (
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
                    <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>返信</button>
                    <ReplyList posts={posts} />
                </li>
            ))}
        </ul>
    );
};

export default PostList;
