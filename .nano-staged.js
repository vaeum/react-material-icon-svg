module.exports = {
  '*.{tsx,ts,jsx,js}': ['prettier --write'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged'],
  'package.json': ['sort-package-json', 'prettier --write'],
};
