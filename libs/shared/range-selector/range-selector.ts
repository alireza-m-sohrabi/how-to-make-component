import {throttle} from "../utilities";

export interface RectanglePointPosition<T = number> {
  left: T;
  top: T;
}

export interface RectangleCoordinate<T = number> extends RectanglePointPosition<T> {
  width: T;
  height: T;
}

export interface RangeSelectorIntersectionChangeEvent {
  node: Element;
  haveIntersection: boolean;
}


export function extendRectangle(fixedPoint: RectanglePointPosition, mobilePoint: RectanglePointPosition): RectangleCoordinate {
  const height = Math.abs(mobilePoint.top - fixedPoint.top);
  const width = Math.abs(mobilePoint.left - fixedPoint.left);
  let top = 0;
  let left = 0;

  if (mobilePoint.left < fixedPoint.left) {
    left = mobilePoint.left;
  } else {
    left = fixedPoint.left;
  }

  if (mobilePoint.top < fixedPoint.top) {
    top = mobilePoint.top;
  } else {
    top = fixedPoint.top;
  }

  return {
    height,
    width,
    top,
    left
  };
}

export function haveIntersection(targetOne: Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right'>,
                                 targetTwo: Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right'>) {
  let haveIntersectionVertically = false;
  let haveIntersectionHorizontally = false;

  if (targetOne.top > targetTwo.top) {
    if (targetTwo.bottom >= targetOne.top) {
      haveIntersectionVertically = true
    }
  } else if (targetOne.bottom >= targetTwo.top) {
    haveIntersectionVertically = true;
  }

  if (targetOne.left > targetTwo.left) {
    if (targetTwo.right >= targetOne.left) {
      haveIntersectionHorizontally = true
    }
  } else if (targetOne.right >= targetTwo.left) {
    haveIntersectionHorizontally = true;
  }

  return haveIntersectionVertically && haveIntersectionHorizontally;
}


export function handleHavingIntersection(intersections: NodeListOf<Element>,
                                         callbackAfterCheckingIntersection: (event: RangeSelectorIntersectionChangeEvent) => void): (growingArea: RectangleCoordinate) => void {
  return throttle((growingArea: RectangleCoordinate) => {
    intersections.forEach((node) => {
      const currentIntersection = node.getAttribute('data-intersection');
      if (haveIntersection(node.getBoundingClientRect(), {
        ...growingArea,
        right: growingArea.left + growingArea.width,
        bottom: growingArea.top + growingArea.height
      })) {
        if (!currentIntersection) {
          callbackAfterCheckingIntersection({node, haveIntersection: true});
          node.setAttribute('data-intersection', 'true');
        }
      } else {
        if (currentIntersection) {
          callbackAfterCheckingIntersection({node, haveIntersection: false});
          node.removeAttribute('data-intersection');

        }
      }
    });
  }, 150, {
    leading: true,
    trailing: true,
  });
}
