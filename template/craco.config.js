const fastRefreshCracoPlugin = require('craco-fast-refresh')
const CracoLessPlugin = require('craco-less')

module.exports = {
  webpack: {
    configure: {
      externals: {
        AMap: 'AMap',
      },
    },
  },
  babel: {
    presets: ['@babel/preset-react', '@babel/env'],
    plugins: [
      'react-activation/babel',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
          },
        },
      ],
    ],
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    return {
      ...devServerConfig,
      port: 3000,
      proxy: {
        // 代理，按需修改
        // '/api': {
        //   target: 'http://apitest.t.iwubida.com',
        //   changeOrigin: true,
        //   ws: false,
        //   secure: false,
        // },
      },
    }
  },
  plugins: [
    {
      plugin: { fastRefreshCracoPlugin },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
