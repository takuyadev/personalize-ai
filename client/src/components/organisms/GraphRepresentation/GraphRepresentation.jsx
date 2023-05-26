"use client";

import React from 'react';
import styles from "./GraphRepresentation.module.scss";


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

const GraphRepresentation = () => {
  const openRate = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
    datasets: [
      {
        label: 'Campaigns',
        data: [3, 6, 9, 12, 15, 18],
        backgroundColor: '#028f11',
        borderColor: 'white',
        borderWidth: 1,
      },
      {
        label: 'Leads',
        data: [4, 5, 7, 9, 12, 15],
        backgroundColor: 'yellow',
        borderColor: 'white',
        borderWidth: 1,
      }

    ]
  }



  const options = {

  }

  return (
    <>
    <h3 className={styles.title}>Performance by Time</h3>
    <p className={styles.description}>Analytics</p>
    <div
      style = {
        {
          padding: '20px',
          width: "80%",
          margin: "auto",
        }
        }
    >
      
      <Bar
        data={openRate}
        options={options}
      />
    

    </div>
    
    </>
  )
}

export default GraphRepresentation