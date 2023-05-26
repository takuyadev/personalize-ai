import React from 'react';
import styles from "./SectionThree.module.scss";
import ImageThree from '@/components/atoms/ImageThree/ImageThree';

const SectionThree = () => {
  return (
    <div className={styles.section}>
      <ImageThree>This is for extension.</ImageThree>
    </div>

  )
}

export default SectionThree