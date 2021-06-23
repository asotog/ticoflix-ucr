const withTM = require("next-transpile-modules")([
  "next-slicezone",
  "essential-slices",
]);

module.exports = withTM({
  images: {
    domains: ["images.prismic.io"],
  },
});
