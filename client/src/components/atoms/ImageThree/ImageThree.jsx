'use client';

import React from 'react'
import styles from './ImageThree.module.scss'

const ImageThree = () => {
  return (
    <div className={styles.imageThree}>
      <div className={styles.extensiondesc}>
        <div className={styles.sectionTitle}>
          <h2>P.I.Y</h2>
          <p>(Personalize It Yourself)</p>
        </div>
        <p>A Google Sheets extension leveraging the power of AI
          to write short personalized first lines
          using the values inside of the cells of a spreadsheet
        </p>
      </div>
      <div className={styles.extensionvid}>
        <iframe width="800" height="500"
          src="https://www.youtube.com/embed/QCRY6cdKHZw?autoplay=1&mute=1&controls=0&loop=1">
        </iframe>
      </div>
    </div>
  )
}

export default ImageThree