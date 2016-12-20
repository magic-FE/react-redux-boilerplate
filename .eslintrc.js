const eslintrc = {
  "extends": "airbnb",
  "env": {
    "browser": true
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "build/webpack-config"
      }
    }
  },
  "globals": {
    "__DEV__": false,
    "__TEST__": false,
    "__PROD__": false,
    "__COVERAGE__": false,
    "window": false
  },
  "parser": "babel-eslint",
  "rules": {
    "comma-dangle": [2, "never"],
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    "react/forbid-prop-types": [0],
    "no-param-reassign": [0],
    "no-console": [0],
    "import/no-extraneous-dependencies": [2, {
      "devDependencies": ["**/build/**/**", "**/tests/**/**","**/bin/**"]
    }],
    "global-require": [0]
  }
}

module.exports = eslintrc;
