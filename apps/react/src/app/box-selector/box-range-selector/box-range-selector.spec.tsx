import { render } from '@testing-library/react';

import BoxRangeSelector from './box-range-selector';

describe('BoxRangeSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BoxRangeSelector />);
    expect(baseElement).toBeTruthy();
  });
});
