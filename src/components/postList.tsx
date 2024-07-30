import type { Post } from '@prisma/client';
import React, { FC } from 'react';
import Image from 'next/image';

interface PostListProps {
    posts: Post[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
    return (
        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
            {posts.map((post) => (
                <li key={post.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                    <p>名前 : {post.name} ： {post.date}</p>
                    <p>{post.content}</p>
                    {post.imagePath && (
                        <Image
                            src={`${post.imagePath}`}
                            alt={`Post ${post.id}`}
                            width={500}
                            height={500}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default PostList;