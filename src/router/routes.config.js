import { BasicLayout } from '@/layouts'
export default [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: BasicLayout,
    children: [
      {
        name: 'Home',
        path: '/home',
        component: resolve =>
          import('@views/home/index').then(module => resolve(module))
      },
      {
        name: 'RegList',
        path: '/reglist',
        component: resolve =>
          import('@views/reg/index').then(module => resolve(module))
      },
      {
        name: 'RegAdd',
        path: '/regadd',
        component: resolve =>
          import('@views/reg/add').then(module => resolve(module))
      },
      {
        name: 'Code',
        path: '/code',
        component: resolve =>
          import('@views/code/index').then(module => resolve(module))
      },
      {
        name: 'CodeShow',
        path: '/code/:id',
        component: resolve =>
          import('@views/code/code').then(module => resolve(module))
      },
      {
        name: 'Map',
        path: '/map',
        component: resolve =>
          import('@views/map/index').then(module => resolve(module))
      }
    ]
  }
]
