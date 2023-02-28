module.exports = {
  displayName: 'vue-range-selector',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+.vue$': '@vue/vue3-jest',
    '.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'json'],
  coverageDirectory: '../../../coverage/libs/vue/range-selector',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      tsconfig: 'libs/vue/range-selector/tsconfig.spec.json',
      babelConfig: 'libs/vue/range-selector/babel.config.js',
    },
    'vue-jest': {
      tsConfig: 'libs/vue/range-selector/tsconfig.spec.json',
      babelConfig: 'libs/vue/range-selector/babel.config.js',
    },
  },
};
