module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        debug: true,
        corejs: {
          proposal: true,
          version: 3.15
        },
        useBuiltIns: 'entry',
        // useBuiltIns: 'usage',
        targets: 'IE 9'
      }
    ],
    [
      '@babel/preset-react', {
        'runtime': 'automatic'
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        // corejs: {
        //   proposals: true,
        //   version: 3
        // }
        corejs: false
      }
    ]
  ]
}