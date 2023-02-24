import BoxSelectorRectangle from './box-selector-rectangle/box-selector-rectangle';
import styles from './box-selector.module.scss';

/* eslint-disable-next-line */
export interface BoxSelectorProps {}

export function BoxSelector(props: BoxSelectorProps) {
  function onMouseDown() {
    onMouseUp();
    onMouseMove();
  }

  function onMouseMove() {}

  function onMouseUp() {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  window.addEventListener('mousedown', onMouseDown);

  return (
    <div className={styles['container']}>
      <div className={styles['box-item-container']}>
        <div className={styles['box-item']}></div>
        <div className={styles['box-item']}></div>
        <div className={styles['box-item']}></div>
      </div>
      <BoxSelectorRectangle></BoxSelectorRectangle>
    </div>
  );
}

export default BoxSelector;
