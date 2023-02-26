import styles from './range-selector-example.module.scss';
import {ReactRangeSelector} from "dist";

/* eslint-disable-next-line */
export interface BoxSelectorProps {
}

export function RangeSelectorExample(props: BoxSelectorProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['box-item-container']}>
        <div className={styles['box-item']}></div>
        <div className={styles['box-item']}></div>
        <div className={styles['box-item']}></div>
      </div>

      <ReactRangeSelector></ReactRangeSelector>
    </div>
  );
}

export default RangeSelectorExample;
