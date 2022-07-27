module.exports = ({ config, mode }) => {
    config.module.rules.push({
      test: /\.(ts|tsx|d.ts)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.d.ts','.ts', '.tsx');
    return config;
  };