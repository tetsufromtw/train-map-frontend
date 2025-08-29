import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/companies',
    pathMatch: 'full'
  },
  {
    path: 'companies',
    loadComponent: () => import('./features/companies/pages/companies-list.page').then(m => m.CompaniesListPage)
  },
  {
    path: '**',
    redirectTo: '/companies'
  }
];
