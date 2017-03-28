module.exports = {
  "ecmaFeatures": {
    "classes": true,
    "jsx": true,
  },
  "env": {
    "browser": true,
    "node": true,
  },
  "extends": [
    'react-native',
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
  },
  "plugins": [
    'react-native'
  ],
  "rules": {
    "import/no-namespace": "off",
    "no-case-declarations": "off",
    "arrow-body-style": "off",
  },
  "settings": {
  }
};
