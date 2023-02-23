import styles from './box-selector.module.scss';

/* eslint-disable-next-line */
export interface BoxSelectorProps {
}

export function BoxSelector(props: BoxSelectorProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['box-item-container']}>
        <div className={styles['box-item']}></div>
        <div className={styles['box-item']}></div>
        <div className={styles['box-item']}></div>
      </div>


    </div>
  );
}

export default BoxSelector;
