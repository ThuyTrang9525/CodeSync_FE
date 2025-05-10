// TopProgressChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const TopProgressChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Thuy Trang', 'Van Vinh', 'Ha Sang'],
        datasets: [{
          label: 'Completion %',
          data: [92, 87, 83],
          backgroundColor: [
            'rgba(0, 150, 136, 0.7)',
            'rgba(0, 150, 136, 0.5)',
            'rgba(0, 150, 136, 0.3)'
          ],
          borderColor: 'rgba(0, 150, 136, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Completion (%)'
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ctx.parsed.x + '%'
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => {
      // cleanup chart to avoid memory leaks
      chartInstance.destroy();
    };
  }, []);

  return (
    <div className="chart-card">
      <h3 className="stat-title">Top 3 Fastest Progress</h3>
      <div className="chart-container" style={{ height: '300px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default TopProgressChart;
