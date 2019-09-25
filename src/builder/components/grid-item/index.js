import React from 'react';

export function getMatGridSizeClass(size) {
    return `mdc-layout-grid__cell mdc-layout-grid__cell--span-${size}`;
}


export const GridItemComponent = ({ size, children, cssClass = '' }) =>
    <div className={`${getMatGridSizeClass(size)}${cssClass !== '' ? ` ${cssClass}` : ''}`}>
        {children}
    </div>;