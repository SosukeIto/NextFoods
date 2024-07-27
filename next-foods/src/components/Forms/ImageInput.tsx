// FileInput.tsx
import React, { useRef } from 'react';

interface FileInputProps {
    setFile: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ setFile }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files ? e.target.files[0] : null);
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
        </div>
    );
};

export default FileInput;
