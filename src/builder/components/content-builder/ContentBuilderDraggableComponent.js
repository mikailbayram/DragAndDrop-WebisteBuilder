import * as React from 'react';
import { DraggableComponent } from '../';
import { ContentBuilderGridComponent } from './';
import ComponentType from '../../component-types';

export const ContentBuilderDraggableComponent = ({
  id,
  name,
  type,
  children,
  onDragOver,
  onDragDrop
}) => {
  if (type === ComponentType.GRID) {
    return <ContentBuilderGridComponent
      id={id}
      children={children}
      onDragOver={onDragOver}
      onDragDrop={onDragDrop}
    />;
  } else {
    return (
      <DraggableComponent
        key={`drag-${id}`}
        name={name}
        type={type}
        onDragStart={() => null}
        draggable={false}
        dropped={true}
      />
    );
  }
};