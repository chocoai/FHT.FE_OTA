module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'standard'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'no-console': 'off',
    // 不限制自闭合标签
    'vue/html-self-closing': 'off',
    'camelcase': [0, {
      'properties': 'always'
    }]
  }
}

