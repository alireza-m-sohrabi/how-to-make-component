import styles from './react-range-selector.module.scss';
import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";


export interface RectanglePosition {
  left: number;
  top: number;
}

export interface CurrentRectanglePosition extends RectanglePosition {
  width: number;
  height: number;
}

/* eslint-disable-next-line */
export interface ReactRangeSelectorProps {
  boundary?: HTMLElement
}

export function ReactRangeSelector(props: ReactRangeSelectorProps) {
  const initialPosition = useRef<RectanglePosition>();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState<CurrentRectanglePosition>();

  function extendRectangle(xCoordinate: number, yCoordinate: number) {
    if (initialPosition.current) {
      const height = Math.abs(yCoordinate - initialPosition.current.top);
      const width = Math.abs(xCoordinate - initialPosition.current.left);
      let top = 0;
      let left = 0;

      if (xCoordinate < initialPosition.current.left) {
        left = xCoordinate;
      } else {
        left = initialPosition.current.left;
      }

      if (yCoordinate < initialPosition.current.top) {
        top = yCoordinate;
      } else {
        top = initialPosition.current.top;
      }

      setCurrentPosition({
        height,
        width,
        top,
        left
      });
    } else {
      initialPosition.current = {
        left: xCoordinate,
        top: yCoordinate,
      };

      setVisible(true);
    }
  }

  useEffect(() => {
    function clear() {
      initialPosition.current = undefined;
      setCurrentPosition(undefined);
      setVisible(false);
    }

    function onMouseDown() {
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);
    }

    function onMouseMove(event: any) {
      extendRectangle(event.pageX, event.pageY);
    }

    function onMouseUp() {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      clear();
    }

    const boundary = props.boundary || window;

    boundary.addEventListener('mousedown', onMouseDown);

    return () => {
      boundary.removeEventListener('mousedown', onMouseDown);
      clear();
    }
  }, [props.boundary]);

  return createPortal(visible ?
    <div style={currentPosition} className={styles['container']}></div> : undefined, document.body);

}

export default ReactRangeSelector;
