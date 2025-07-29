// src/app/components/JustifyBox.jsx
import React from 'react';

const JustifyBox = ({ children, ...props }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', ...props.style }}>
            {children}
        </div>
    );
};

export default JustifyBox;
