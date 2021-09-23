export const extensionRoutes = [  {
    path: 'extensions/greet',
    loadChildren: () => import('./extensions/8a7a14c0c2154e3794205124bde954b3d67146667cce7c3f4f1307c28fba83b2/greeting.module').then(m => m.GreeterModule),
  },
  {
    path: 'extensions/addManualOrder',
    loadChildren: () => import('./extensions/8a7a14c0c2154e3794205124bde954b3d67146667cce7c3f4f1307c28fba83b2/add-manual-order.module').then(m => m.AddManualOrderModule),
  },
  {
    path: 'extensions/orderSummary',
    loadChildren: () => import('./extensions/8a7a14c0c2154e3794205124bde954b3d67146667cce7c3f4f1307c28fba83b2/order-summary.module').then(m => m.OrderSummaryModule),
  },
  {
    path: 'extensions/orderView',
    loadChildren: () => import('./extensions/8a7a14c0c2154e3794205124bde954b3d67146667cce7c3f4f1307c28fba83b2/order-view.module').then(m => m.OrderViewModule),
  }];
