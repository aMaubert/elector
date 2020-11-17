// postcss.config.js
const autoprefixer = require("autoprefixer")();
const tailwindcss = require("tailwindcss")("./tailwind.js");

module.exports = {
  plugins: [tailwindcss, autoprefixer]
};
