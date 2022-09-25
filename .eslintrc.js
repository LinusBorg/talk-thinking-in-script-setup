module.exports = {
  extends: ["@linusborg/eslint-config"],
  overrides: [
    {
      files: ["*.{js,ts}", "./setup/*.ts"],
      env: {
        node: true,
      },
    },
  ],
};
