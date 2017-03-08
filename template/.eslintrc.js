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
    "isDev": false,
    "isTest": false,
    "isProd": false,
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
