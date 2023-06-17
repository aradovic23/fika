/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 120,
  singleQuote: true,
  tabWidth: 2,
  arrowParens: 'avoid',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
