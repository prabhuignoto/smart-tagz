// module.exports = {
//   parser: "vue-eslint-parser",
//   parserOptions: {
//     parser: "@typescript-eslint/parser",
//   },
//   extends: [
//     // add more generic rulesets here, such as:
//     // 'eslint:recommended',
//     "plugin:vue/vue3-recommended",
//   ],
//   rules: {
//     // override/add rules settings here, such as:
//     // 'vue/no-unused-vars': 'error'
//   },
// };

module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "vue/no-unused-components": "off",
    "vue/no-unused-vars": "off",
  },
  plugins: ["vue"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
};
