import { forwardRef, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './box-selector-rectangle.module.scss';

/* eslint-disable-next-line */
export interface BoxSelectorRectangleProps {}

export interface BoxSelectorRectangleState {
  currentPosition?: BoxRectanglePosition;
  initialPosition?: BoxRectanglePosition;
  isMoving?: boolean;
}

export interface BoxRectanglePosition {
  left: number;
  top: number;
}

export interface BoxRectangleState extends BoxRectanglePosition {
  right: number;
  bottom: number;
}

export const BoxSelectorRectangle = forwardRef(
  (props: BoxSelectorRectangleProps, ref) => {
    const initialPosition = useRef<BoxRectanglePosition>();

    const [currentPosition, setCurrentPosition] = useState<BoxRectangleState>();

    const [show, setShow] = useState(false);

    function extendRectangle(xCoordinate: number, yCoordinate: number) {
      if (initialPosition.current) {
        let bottom = Math.abs(yCoordinate - initialPosition.current.top);
        let right = Math.abs(xCoordinate - initialPosition.current.left);
        let top = yCoordinate;
        let left = xCoordinate;

        if (xCoordinate < initialPosition.current.left) {
          right = initialPosition.current.left;
          left = xCoordinate;
        } else {
          left = initialPosition.current.left;
          right = xCoordinate;
        }

        if (yCoordinate > initialPosition.current.top) {
          bottom = initialPosition.current.left;
          top = yCoordinate;
        } else {
          top = initialPosition.current.top;
          right = yCoordinate;
        }

        setCurrentPosition({
          bottom,
          left,
          top,
          right,
        });
      } else {
        initialPosition.current = {
          left: xCoordinate,
          top: yCoordinate,
        };

        setShow(true);
      }
    }

    function clear() {
      initialPosition.current = undefined;
      setShow(false);
    }

    return createPortal(
      show ? (
        <div style={currentPosition} className={styles['container']}></div>
      ) : null,
      document.body
    );
  }
);

export default BoxSelectorRectangle;
