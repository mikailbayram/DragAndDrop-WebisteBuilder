
import * as React from 'react';
import './droppable.css';


export const DroppableComponent = ({ name, onDragOver, onDrop, children }) =>
    <div
        className='droppable-component'
        onDragOver={(ev) => onDragOver(ev)}
        onDrop={(ev) => onDrop(ev, name)}
        data-id={name}
    >
        <span>Drop components here!</span>
        {children}
    </div>;