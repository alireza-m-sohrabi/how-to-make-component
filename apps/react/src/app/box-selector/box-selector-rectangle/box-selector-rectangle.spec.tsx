import { render } from '@testing-library/react';

import BoxSelectorRectangle from './box-selector-rectangle';

describe('BoxSelectorRectangle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BoxSelectorRectangle />);
    expect(baseElement).toBeTruthy();
  });
});
