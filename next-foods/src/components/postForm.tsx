import React, { useState, useRef, FormEvent } from 'react';
interface Post {
    id: number;
    name: string;
    content: string;
    imageUrl?: string;
    date: string;
}
interface PostFormProps {
    onPostSubmit: (formdata: FormData, newPostData: Post) => Promise<void>;
}

const PostForm: React.FC<PostFormProps> = ({ onPostSubmit }) => {
    const [newPostContent, setNewPostContent] = useState<string>('');
    const [newPostName, setNewPostName] = useState<string>('');
    const [newPostImage, setNewPostImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const now = new Date();
        const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}(${['日', '月', '火', '水', '木', '金', '土'][now.getDay()]}) ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const newPostData: Post = {
            id: Date.now(),
            name: newPostName ? newPostName : "匿名メンバー",
            content: newPostContent,
            imageUrl: newPostImage ? URL.createObjectURL(newPostImage) : undefined,
            date: formattedDate
        };

        const formdata = new FormData();
        if (newPostImage) {
            formdata.append('file', newPostImage);
        }

        await onPostSubmit(formdata, newPostData);

        setNewPostContent('');
        setNewPostName('');
        setNewPostImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
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
                    name="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => setNewPostImage(e.target.files ? e.target.files[0] : null)}
                    style={{ padding: '5px', marginTop: '10px' }}
                />
            </div>
            <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>投稿</button>
        </form>
    );
};

export default PostForm;
