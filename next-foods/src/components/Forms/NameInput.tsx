// NameInput.tsx
import React from 'react';

interface NameInputProps {
    name: string;
    setName: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ name, setName }) => {
    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="名前"
                style={{ padding: '5px', width: '300px', marginRight: '10px' }}
            />
        </div>
    );
};

export default NameInput;
