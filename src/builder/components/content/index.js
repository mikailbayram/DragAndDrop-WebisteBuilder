import React from 'react';
import './content-component.css';

export const ContentComponent = ({ children, className = '' }) =>
    <div className={className}>
        <div className='content'>
            {children}
        </div>
    </div>;
