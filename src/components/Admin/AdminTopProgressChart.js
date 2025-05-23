// TopProgressChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import { fetchAdminGoals } from '../../service/api';
const TopProgressChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchAndRender = async () => {
      try {
        const response = await fetchAdminGoals();
        const goals = response.data;

        // Đếm số lượng theo trạng thái
        const counts = {
          not_started: 0,
          in_progress: 0,
          completed: 0
        };

        goals.forEach(goal => {
          if (goal.status === 'not-started') counts.not_started += 1;
          else if (goal.status === 'in-progress') counts.in_progress += 1;
          else if (goal.status === 'completed') counts.completed += 1;
        });

        const labels = ['Not started', 'In progress', 'Completed'];
        const dataValues = [
          counts.not_started,
          counts.in_progress,
          counts.completed
        ];

        renderChart(labels, dataValues);
      } catch (err) {
        console.error('Failed to fetch goals:', err);
      }
    };

    const renderChart = (labels, dataValues) => {
      const ctx = chartRef.current?.getContext('2d');
      if (!ctx) return;

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Number of Goals',
            data: dataValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(219, 248, 0, 0.7)',
              'rgba(0, 241, 48, 0.92)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(219, 248, 0, 0.7)',
              'rgba(0, 241, 48, 0.92)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'x',
          scales: {
            x: {
              title: {
                display: true,
                text: 'Status'
              }
            },
            y: {
              beginAtZero: true,
              stepSize: 1,
              ticks: {
                precision: 0
              }
            }
          },
          plugins: {
            legend: { display: true },
            tooltip: {
              callbacks: {
                label: (context) => `${context.raw} goals`
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    };

    fetchAndRender();

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="chart-card">
      <h1 style={{fontSize:"36px", fontWeight:"bold"}} className="stat-title">Goals Status Distribution</h1>
      <div className="chart-container" style={{ height: '300px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default TopProgressChart;