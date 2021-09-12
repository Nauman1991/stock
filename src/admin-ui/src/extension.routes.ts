export const extensionRoutes = [  {
    path: 'extensions/greet',
    loadChildren: () => import('./extensions/afc3a97fa7f4cd1822755b0eab6c094ef4d5e962518cf42b80394ef5d37e3059/greeting.module').then(m => m.GreeterModule),
  },
  {
    path: 'extensions/addManualOrder',
    loadChildren: () => import('./extensions/afc3a97fa7f4cd1822755b0eab6c094ef4d5e962518cf42b80394ef5d37e3059/add-manual-order.module').then(m => m.AddManualOrderModule),
  }];
