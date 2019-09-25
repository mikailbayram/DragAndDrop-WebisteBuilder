import * as React from 'react';
import './draggable-component.css';

export const DraggableComponent = ({
  name,
  type,
  onDragStart,
  draggable = true,
  dropped = false
}) =>
  <div className='draggable-component' draggable={draggable} onDragStart={(ev) => onDragStart(ev, name, type)}>
    {name}
  </div>;