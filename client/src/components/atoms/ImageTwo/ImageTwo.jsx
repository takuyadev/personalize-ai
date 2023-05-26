"use client";
import React from 'react';
import styles from './ImageTwo.module.scss'

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale, // y
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale, // y
  Tooltip,
  Legend
)

const ImageTwo = () => {
  const openRate = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
    datasets: [
      {
        label: 'Campaigns',
        data: [3, 6, 9, 12, 15, 18],
        backgroundColor: '#028f11',
        borderColor: 'none',
        borderWidth: 1,
      },
      {
        label: 'Leads',
        data: [4, 5, 7, 9, 12, 15],
        backgroundColor: 'yellow',
        borderColor: 'none',
        borderWidth: 1,
      }

    ]
  }



  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Campaigns',
        font: {
          size: 24, // Adjust the font size as needed
        },
      },
    },
  };

  return (
    <>
    <div className={styles.imageTwo}>
      <div
        style = {
          {
            padding: '20px',
            width: "75%",
            margin: "auto",
          }
          }
      >
        
        <Bar
          data={openRate}
          options={options}
        />
      </div>
      <div className={styles.extensiondesc}>
        <div className={styles.sectionTitle}>
          <h2>Get Accurate Insights</h2>
          <p>Real-time campaign performance tracking</p>
        </div>
        <p>Get campaign analytics that lists out AI generated first lines
          that need human intervention, screening them and ensuring that only
          the most natural and personal lines get sent to a lead
        </p>
      </div>
    </div>
    </>
  )
}

export default ImageTwo