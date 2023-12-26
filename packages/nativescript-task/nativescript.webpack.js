module.exports = (webpack) => {
  webpack.chainWebpack(
    (config, env) => {
      const fs = require('fs');
      const filePath = `./${env.appPath}/globalWorker.js`;
      const filePathTs = `./${env.appPath}/globalWorker.ts`;
      if (!fs.existsSync(filePath) && !fs.existsSync(filePathTs)) {
        const path = require('path');
        config.resolve.alias.set('~/globalWorker', path.resolve(__dirname, 'globalWorker.js'));
      }
    },
    { order: -2 }
  );
};
