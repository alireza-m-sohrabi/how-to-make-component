import { render } from '@testing-library/react';

import ReactRangeSelector from './react-range-selector';

describe('ReactRangeSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactRangeSelector />);
    expect(baseElement).toBeTruthy();
  });
});
