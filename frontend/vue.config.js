module.exports = {
  devServer: {
    proxy: 'http://app:8080',
    public: 'toutobu-annotator.local:3333',
    https: true,
  },
};
