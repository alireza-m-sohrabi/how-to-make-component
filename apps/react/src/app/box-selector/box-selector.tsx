import styles from './box-selector.module.scss';
import BoxRangeSelector from "./box-range-selector/box-range-selector";
import {useState} from "react";

/* eslint-disable-next-line */
export interface BoxSelectorProps {
}

export function BoxSelector(props: BoxSelectorProps) {

  const [boundary, setBoundary] = useState<HTMLElement>();

  // setTimeout(() => {
  //   setBoundary(document.documentElement);
  // }, 2000)
  return (
    <div className={styles['container']}>
      <div className={styles['box-item-container']}>
        <div className={styles['box-item']}></div>
        <div className={styles['box-item']}></div>
        <div className={styles['box-item']}></div>
      </div>
      <BoxRangeSelector boundary={boundary}></BoxRangeSelector>
    </div>
  );
}

export default BoxSelector;
