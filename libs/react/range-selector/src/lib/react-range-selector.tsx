import
  styles from './react-range-selector.module.scss';
import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {
  extendRectangle, handleHavingIntersection, RangeSelectorIntersectionChangeEvent,
  RectangleCoordinate,
  RectanglePointPosition,
} from "../../../../shared/range-selector";


/* eslint-disable-next-line */
export interface ReactRangeSelectorProps {
  boundary?: HTMLElement,
  intersectionElementSelector: string;
  intersectionChange: (event: RangeSelectorIntersectionChangeEvent) => void;
}

export function ReactRangeSelector(props: ReactRangeSelectorProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [rectangleCoordinate, setRectangleCoordinate] = useState<RectangleCoordinate>();

  useEffect(() => {
    let fixedPosition: RectanglePointPosition | undefined;
    const intersections = document.documentElement.querySelectorAll(props.intersectionElementSelector);
    const handleIntersectionWhenAreaGrows = handleHavingIntersection(intersections, (event) => props.intersectionChange(event));

    function onMouseDown() {
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);
    }


    function onMouseMove(event: MouseEvent) {
      if (fixedPosition) {
        const rectangleCoordinate = extendRectangle(fixedPosition, {top: event.pageY, left: event.pageX});

        handleIntersectionWhenAreaGrows(rectangleCoordinate);
        setRectangleCoordinate(rectangleCoordinate);
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
