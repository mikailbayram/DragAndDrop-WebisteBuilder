import  React from 'react';

import { DroppableComponent, GridComponent, GridItemComponent  } from '../';
import { ContentBuilderDraggableComponent } from './';


export const ContentBuilderGridComponent = ({
  id,
  children,
  onDragOver,
  onDragDrop
}) => (
  <GridComponent key={id}>
    {
      children.map(({ children: gridItemChildren, renderProps }, gridItemIndex) => {
        const gridId = `${id}_${gridItemIndex}`;
        return (
          <GridItemComponent key={gridId} size={renderProps.size}>
            {
              gridItemChildren.map((child, index) => (
                <ContentBuilderDraggableComponent
                  key={`${gridId}_${index}`}
                  id={`${gridId}_${index}`}
                  name={child.name}
                  type={child.type}
                  children={child.children}
                  onDragOver={onDragOver}
                  onDragDrop={onDragDrop}
                />
              ))
            }
            <DroppableComponent
              name={gridId}
              onDragOver={(ev) => onDragOver(ev)}
              onDrop={(ev) => onDragDrop(ev, gridId)}
            />
          </GridItemComponent>
        );
      })}
  </GridComponent>
);