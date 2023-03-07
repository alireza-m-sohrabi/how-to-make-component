import styles from './range-selector-example.module.scss';
import {ReactRangeSelector} from "dist";
import {useCallback} from "react";
import {RangeSelectorIntersectionChangeEvent} from "@how-to-make/shared/range-selector";

/* eslint-disable-next-line */
export interface BoxSelectorProps {
}

export function RangeSelectorExample(props: BoxSelectorProps) {

  const onIntersectionChange = useCallback((event: RangeSelectorIntersectionChangeEvent) => {
      if (event.haveIntersection) {
        event.node.classList.add(styles['--active']);
      } else {
        event.node.classList.remove(styles['--active']);
      }
  }, [])


  return (
    <div className={styles['container']}>
      <div className={styles['box-container']}>
        <div className={styles['box-item']}></div>
        <div className={styles['box-item']}></div>
        <div className={styles['box-item']}></div>
      </div>

      <ReactRangeSelector
        intersectionChange={(event) => onIntersectionChange(event)}
        intersectionElementSelector={'[class*="box-item"]'}></ReactRangeSelector>
    </div>
  );
}

export default RangeSelectorExample;
