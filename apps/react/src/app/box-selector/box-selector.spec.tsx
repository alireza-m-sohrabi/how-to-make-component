import { render } from '@testing-library/react';

import BoxSelector from './box-selector';

describe('BoxSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BoxSelector />);
    expect(baseElement).toBeTruthy();
  });
});
