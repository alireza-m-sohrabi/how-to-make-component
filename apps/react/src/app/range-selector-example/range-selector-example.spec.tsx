import { render } from '@testing-library/react';

import RangeSelectorExample from './range-selector-example';

describe('RangeSelectorExample', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RangeSelectorExample />);
    expect(baseElement).toBeTruthy();
  });
});
