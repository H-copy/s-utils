const path = require('path')
const resolve = _path => path.resolve(__dirname, _path)

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
	project: resolve('./tsconfig.json'),  
    tsconfigRootDir: resolve('./'),
    sourceType: 'module'
  },
  extends:[
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    '@typescript-eslint/type-annotation-spacing': 'off'
	}
};
