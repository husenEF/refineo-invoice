module.exports = {
  "**/*.{ts,tsx,js,jsx}": ["prettier --write", "next lint --fix"],
  "**/*.{json,md}": ["prettier --write"],
};
