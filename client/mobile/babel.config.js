/* eslint-disable quotes */
/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [require.resolve("expo-router/babel")],
  };
};
