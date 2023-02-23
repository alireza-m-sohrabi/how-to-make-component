import styles from './box-selector-rectangle.module.scss';

/* eslint-disable-next-line */
export interface BoxSelectorRectangleProps {}

export function BoxSelectorRectangle(props: BoxSelectorRectangleProps) {
  return (
    <div onKeyDown={} className={styles['container']}>
      <h1>Welcome to BoxSelectorRectangle!</h1>
    </div>
  );
}

export default BoxSelectorRectangle;
