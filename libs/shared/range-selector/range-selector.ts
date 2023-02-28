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
