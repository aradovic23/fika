/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 120,
  singleQuote: true,
  tabWidth: 4,
  arrowParens: 'avoid',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
