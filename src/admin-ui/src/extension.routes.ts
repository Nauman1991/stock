export const extensionRoutes = [  {
    path: 'extensions/greet',
    loadChildren: () => import('./extensions/d726e2bbfc91d7f68dcdc73b04ae7668d055c75559ae9dfc834196ac8b213ef6/greeting.module').then(m => m.GreeterModule),
  },
  {
    path: 'extensions/addManualOrder',
    loadChildren: () => import('./extensions/d726e2bbfc91d7f68dcdc73b04ae7668d055c75559ae9dfc834196ac8b213ef6/add-manual-order.module').then(m => m.AddManualOrderModule),
  },
  {
    path: 'extensions/orderSummary',
    loadChildren: () => import('./extensions/d726e2bbfc91d7f68dcdc73b04ae7668d055c75559ae9dfc834196ac8b213ef6/order-summary.module').then(m => m.OrderSummaryModule),
  },
  {
    path: 'extensions/orderView',
    loadChildren: () => import('./extensions/d726e2bbfc91d7f68dcdc73b04ae7668d055c75559ae9dfc834196ac8b213ef6/order-view.module').then(m => m.OrderViewModule),
  },
  {
    path: 'extensions/stockCustomView',
    loadChildren: () => import('./extensions/d726e2bbfc91d7f68dcdc73b04ae7668d055c75559ae9dfc834196ac8b213ef6/stock-custom-view.module').then(m => m.StockCustomViewModule),
  }];
