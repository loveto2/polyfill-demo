// preset-env 应用级 按需引入
// module.exports = {
//   presets: [
//     [
//       '@babel/preset-env',
//       {
//         debug: true,
//         corejs: {
//           proposals: true,
//           version: 3
//         },
//         loose: true,
//         shippedProposals: true,
//         targets: [
//           '> 1%',
//           'last 3 version'
//         ],
//         useBuiltIns: 'usage',
//       }
//     ]
//   ],
// }

// preset-env 应用级 全量引入 需在main.js中引入core-js
// module.exports = {
//   presets: [
//     [
//       '@babel/preset-env',
//       {
//         debug: true,
//         corejs: {
//           proposals: true,
//           version: 3
//         },
//         loose: true,
//         shippedProposals: true,
//         targets: [
//           '> 1%',
//           'last 3 version'
//         ],
//         useBuiltIns: 'entry',
//       }
//     ]
//   ],
// }

//  插件 按需引入 库级
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: true,
        // corejs: {
        //   proposals: true,
        //   version: 3
        // },
        // loose: true,
        // shippedProposals: true,
        // targets: [
        //   '> 1%',
        //   'last 3 version'
        // ],
        // useBuiltIns: 'usage',
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: {
          proposals: true,
          version: 3
        },
        helpers: true,
        regenerator: true
      },
    ]
  ]
}