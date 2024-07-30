import React, { useState, useRef } from 'react';

interface FileInputProps {
    setFile: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ setFile }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFile(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    return (
        <div>
            <input
                type="file"
                name="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
                style={{ padding: '5px', marginTop: '10px' }}
            />
            {previewUrl && <img src={previewUrl} alt="Preview" style={{ marginTop: '10px' }} />}
        </div>
    );
};

export default FileInput;
