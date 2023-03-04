import styles from './react-range-selector.module.scss';
import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {
  extendRectangle,
  RectangleCoordinate,
  RectanglePointPosition
} from "../../../../shared/range-selector/range-selector";


/* eslint-disable-next-line */
export interface ReactRangeSelectorProps {
  boundary?: HTMLElement,
  
}

export function ReactRangeSelector(props: ReactRangeSelectorProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [rectangleCoordinate, setRectangleCoordinate] = useState<RectangleCoordinate>();

  useEffect(() => {
    let fixedPosition: RectanglePointPosition | undefined;


    function onMouseDown() {
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);
    }

    function onMouseMove(event: MouseEvent) {
      if (fixedPosition) {
        setRectangleCoordinate(extendRectangle(fixedPosition, {top: event.pageY, left: event.pageX}));
      } else {
        fixedPosition = {
          left: event.pageX,
          top: event.pageY,
        };

        setVisible(true);
      }
    }

    function onMouseUp() {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      clear();
    }

    function clear() {
      fixedPosition = undefined;
      setRectangleCoordinate(undefined);
      setVisible(false);
    }

    const boundary = props.boundary || window;

    boundary.addEventListener('mousedown', onMouseDown);

    return () => {
      boundary.removeEventListener('mousedown', onMouseDown);
      clear();
    }
  }, [props.boundary]);

  return createPortal(visible ?
    <div style={rectangleCoordinate} className={styles['container']}></div> : undefined, document.body);

}

export default ReactRangeSelector;
