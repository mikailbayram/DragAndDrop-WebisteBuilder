import  React from 'react';


export const GridComponent = ({ children }) =>
  <div className='mdc-layout-grid'>
    <div className='mdc-layout-grid__inner'>
      {children}
    </div>
  </div>;