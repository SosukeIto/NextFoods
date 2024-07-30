// ContentInput.tsx
import React from 'react';

interface ContentInputProps {
    content: string;
    setContent: (content: string) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ content, setContent }) => {
    return (
        <div>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="あなたが食べたご飯はなに？"
                style={{ padding: '5px', width: '300px', marginRight: '10px' }}
            />
        </div>
    );
};

export default ContentInput;
