```bash
npm install --save-dev husky lint-staged
```






```js
"husky": {
    "hooks": {
      "pre-commit": "lint-staged && npm run build"
    }
  },
  "lint-staged": {
    "**/*.+(js|json|css|html|md)": [
      "prettier",
      "jest --findRelatedTests",
      "git add"
    ]
  },
```
