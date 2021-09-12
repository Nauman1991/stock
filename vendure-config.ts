// import path from 'path';
// import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
// import { VendureConfig } from '@vendure/core';
// import { compileUiExtensions } from '@vendure/ui-devkit/compiler';

// export const config: VendureConfig = {
//   // ...
//   plugins: [
//     AdminUiPlugin.init({
//       port: 5001,
//       app: compileUiExtensions({
//         outputPath: path.join(__dirname, 'admin-ui'),
//         extensions: [{
//           extensionPath: path.join(__dirname, 'ui-extensions'),
//           ngModules: [{
//             type: 'lazy',
//             route: 'greet',
//             ngModuleFileName: 'greeter.module.ts',
//             ngModuleName: 'GreeterModule',
//           }],
//         }],
//       }),
//     }),
//   ],
// }