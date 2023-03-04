export interface RectanglePointPosition<T = number> {
  left: T;
  top: T;
}

export interface RectangleCoordinate<T = number> extends RectanglePointPosition<T> {
  width: T;
  height: T;
}

export function extendRectangle(fixedPoint: RectanglePointPosition, mobilePoint: RectanglePointPosition): RectangleCoordinate | undefined {
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

export function haveIntersection(targetOne: RectangleCoordinate, targetTwo: RectangleCoordinate) {
  let haveIntersection = true;

 const targetOneTop = targetOne.top;
 const targetOneBottom = targetOne.top + targetOne.height;
 const targetOneLeft = targetOne.left;
 const targetOneRight = targetOne.left + targetOne.width;

  const targetTwoTop = targetTwo.top;
  const targetTwoBottom = targetTwo.top + targetTwo.height;
  const targetTwoLeft = targetTwo.left;
  const targetTwoRight = targetTwo.left + targetTwo.width;



  if (!(targetOneTop > targetTwoBottom && targetTwoTop > targetOneBottom)) {
    haveIntersection = false;
  }

  if (!(targetOneLeft > targetTwoRight && targetTwoLeft > targetOneRight)) {
    haveIntersection = false
  }

  return haveIntersection;
}
