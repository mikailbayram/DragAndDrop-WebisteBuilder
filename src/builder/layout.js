import { fromJS } from 'immutable';
import React from 'react';

import './layout.css';

import { ContentBuilderComponent, DraggableComponent } from './components';
import { DraggableComponents } from './draggable-components';
import ComponentType from './component-types';

const INT_LENGTH = 3;

const originalState = [
    {
        components: []
    },
    {
        components: []
    },
    {
        components: []
    },
];

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardState: originalState,
            isDragging: false
        }
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragDrop = this.onDragDrop.bind(this);
    }

    render() {
        const { dashboardState } = this.state;
        return (
            <div className='builder'>
                <div className='builder-draggables'>
                    {
                        DraggableComponents.map(({ name, type }, index) =>
                            <DraggableComponent
                                key={`comp-${index}`}
                                name={name}
                                type={type}
                                onDragStart={this.onDragStart}
                                dropped={false}
                            />
                        )}
                </div>
                <div className='builder-droppables'>
                    {
                        dashboardState.map(({ id, cssClass, components }, index) => (
                            <ContentBuilderComponent
                                key={`cb_${index}`}
                                id={`cb_${index}`}
                                cssClass={cssClass}
                                components={components}
                                onDragDrop={this.onDragDrop}
                                onDragOver={(ev) => this.onDragOver(ev)}
                            />
                        )
                        )}
                </div>
            </div>
        );
    }

    onDragStart(event, name, type) {
        event.dataTransfer.setData('id', name);
        event.dataTransfer.setData('type', type);
    }

    onDragOver(event) {
        event.preventDefault();
    }

    /**
     * Handles drop into droppable component and updates application state
     * Create new component based on draggable name and type
     * Create an array of indexes to determine position in state
     * Loop through array of indexes and build out path to update
     * Create ImmutableJS object and update path with new component
     * Save state
     * @param event
     * @param containerId
     */
    onDragDrop(event, containerId) {
        const name = event.dataTransfer.getData('id');
        const type = event.dataTransfer.getData('type');
        const newComponent = this.generateComponent(name, type);
        const containerArray = containerId.split('_');
        containerArray.shift(); // ignore first param, it is string prefix
        const componentsPath = [];
        containerArray.forEach((id, index) => {
            componentsPath.push(parseInt(id, INT_LENGTH));
            componentsPath.push(index === 0 ? 'components' : 'children');
        });
        const { dashboardState } = this.state;
        let componentState = fromJS(dashboardState);
        componentState = componentState.setIn(componentsPath, componentState.getIn(componentsPath).push(newComponent));
        this.setState({ dashboardState: componentState.toJS() });
        this.setState({ dashboardState: componentState.toJS() });
    }

    generateComponent(name, type) {
        let newComponent = {
            name,
            type
        };
        if (type === ComponentType.GRID) { // TODO - predefine this somewhere else (default props)
            const gridItem = {
                children: [],
                name: '',
                renderProps: {
                    size: 6 // <- make this configurable
                },
                type: ComponentType.GRID_ITEM
            };
            newComponent = {
                ...newComponent,
                children: [gridItem, gridItem] // <- make this configurable
            };
        }
        return newComponent;
    }

}

export default Layout;