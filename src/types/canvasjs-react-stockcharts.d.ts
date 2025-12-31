declare module '@canvasjs/react-stockcharts' {
  import React from 'react';

  interface CanvasJSReactType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CanvasJSStockChart: React.ComponentType<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CanvasJSChart: React.ComponentType<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CanvasJS: any;
  }

  const CanvasJSReact: CanvasJSReactType;
  export default CanvasJSReact;
}
