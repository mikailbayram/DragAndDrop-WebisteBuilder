import React from 'react';

import { ContentComponent, DroppableComponent } from '../';
import { ContentBuilderDraggableComponent } from './';


export class ContentBuilderComponent extends React.Component {

  render() {
    const { components, id, onDragOver, onDragDrop } = this.props;
    return (
      <ContentComponent>
        {
          components.map(({ name, type, children }, componentIndex) => (
            <ContentBuilderDraggableComponent
              key={`${id}_${componentIndex}`}
              id={`${id}_${componentIndex}`}
              name={name}
              type={type}
              children={children}
              onDragOver={onDragOver}
              onDragDrop={onDragDrop}
            />
          ))}
          <DroppableComponent
            name={id}
            onDragOver={(ev) => onDragOver(ev)}
            onDrop={(ev) => onDragDrop(ev, id)}
          />
      </ContentComponent>
    );
  }

}