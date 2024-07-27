import React, { useState, useRef, FormEvent } from 'react';
import { Post } from '../types/post';
import { uploadFile } from '../modules/uploadFile';
import {convertDate} from '../modules/convertDate';
import NameInput from './Forms/NameInput';
import ContentInput from './Forms/ContentInput';
import FileInput from './Forms/ImageInput'; 

interface PostFormProps {
    onPostSubmit: (newPostData: Post) => Promise<void>;
}

const PostForm: React.FC<PostFormProps> = ({ onPostSubmit }) => {
    const [newPostContent, setNewPostContent] = useState<string>('');
    const [newPostName, setNewPostName] = useState<string>('');
    const [newPostImage, setNewPostImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formdata = new FormData();
        if (newPostImage) {
            formdata.append('file', newPostImage);
        }

        const now = new Date();
        const fileName = await uploadFile(formdata) || "";
        const formattedDate = await convertDate(now)

        const newPostData: Post = {
            id: Date.now(),
            name: newPostName ? newPostName : "匿名メンバー",
            content: newPostContent,
            imagePath: fileName ? fileName : undefined,
            date: formattedDate
        };
        await onPostSubmit(newPostData);

        setNewPostContent('');
        setNewPostName('');
        setNewPostImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>

            <NameInput name={newPostName} setName={setNewPostName} />
            <ContentInput content={newPostContent} setContent={setNewPostContent} />
            <FileInput setFile={setNewPostImage} />
            <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>投稿</button>
        </form>
    );
};

export default PostForm;
