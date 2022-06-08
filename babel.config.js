module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }],
      // Path alias
      // [
      //   'module-resolver',
      //   {
      //     root: ['./'],
      //     extensions: [
      //       '.ios.js',
      //       '.android.js',
      //       '.js',
      //       '.ts',
      //       '.tsx',
      //       '.json',
      //     ],
      //     alias: {
      //       Components: './components',
      //       States: './state',
      //       Routes: './routes',
      //       Assets: './assets',
      //       Types: './types',
      //     },
      //   },
      // ],
      'react-native-reanimated/plugin',
    ]
  }
}
