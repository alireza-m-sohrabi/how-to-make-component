import { shallowMount } from '@vue/test-utils';
import HelloWorld from '../../src/lib/RangeSelector.vue';

describe('RangeSelector.vue', () => {
  it('renders welcome message', () => {
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.text()).toMatch(
      'Welcome to Your Vue.js + TypeScript Library'
    );
  });
});
