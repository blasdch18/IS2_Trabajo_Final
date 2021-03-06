import { Routes } from '@angular/router';
import { UIRouterModule } from 'ui-router-ng2';
import { components } from './components';

export let statesConfig: any = {
  useHash: true,
  otherwise: '/login',
  states: [
    {
      name: 'login',
      url: '/login',
      component: components.LoginComponent
    },
    {
      name: 'register',
      url: '/register',
      component: components.RegisterComponent
    }
  ]
};
