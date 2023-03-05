// @ts-ignore
import _debounce from 'lodash.debounce';
// @ts-ignore
import _throttle from "lodash.throttle";

export const debounce = _debounce;
export const throttle: (callback: any, wait: number, options: {
  leading: boolean,
  trailing: boolean
}) => (...args: any[]) => void = _throttle;


