import CanvasJSReact from '@canvasjs/react-stockcharts';
import React from 'react';

//const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class CanvasChart extends React.Component {
  constructor(props: React.ComponentProps<typeof CanvasJSStockChart>) {
    super(props);
    this.generateDataPoints = this.generateDataPoints.bind(this);
  }
  generateDataPoints(noOfDps: number) {
    let xVal = 1,
      yVal = 100;
    const dps = [];
    for (let i = 0; i < noOfDps; i++) {
      yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
      dps.push({ x: xVal, y: yVal });
      xVal++;
    }
    return dps;
  }

  render() {
    const options = {
      title: {
        text: 'React StockChart',
      },
      animationEnabled: true,
      exportEnabled: true,
      charts: [
        {
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
            },
          },
          axisY: {
            crosshair: {
              enabled: true,
              //snapToDataPoint: true
            },
          },
          data: [
            {
              type: 'spline',
              dataPoints: this.generateDataPoints(10000),
            },
          ],
        },
      ],
      rangeSelector: {
        inputFields: {
          startValue: 4000,
          endValue: 6000,
          valueFormatString: '###0',
        },

        buttons: [
          {
            label: '1000',
            range: 1000,
            rangeType: 'number',
          },
          {
            label: '2000',
            range: 2000,
            rangeType: 'number',
          },
          {
            label: '5000',
            range: 5000,
            rangeType: 'number',
          },
          {
            label: 'All',
            rangeType: 'all',
          },
        ],
      },
    };
    const containerProps = {
      width: '500px',
      height: '300px',
      margin: 'auto',
    };
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>2. CanvasJS</h1>
        <CanvasJSStockChart containerProps={containerProps} options={options} />
      </div>
    );
  }
}

export default CanvasChart;
