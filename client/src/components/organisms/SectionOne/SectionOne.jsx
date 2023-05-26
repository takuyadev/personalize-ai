import React from 'react';
import styles from "./SectionOne.module.scss";
import ImageOne from '@/components/atoms/ImageOne/ImageOne';

const SectionOne = () => {
  return (
    <div className={styles.section}>
      <ImageOne></ImageOne>
    </div>

  )
}

export default SectionOne