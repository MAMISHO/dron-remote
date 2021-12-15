import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './modules/auth/auth-guard.service';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { DashboardComponent } from './modules/pages/dashboard/dashboard.component';
import { NopagefoundComponent } from './modules/pages/nopagefound/nopagefound.component';

// const routes: Routes = [];
// export const routes: Routes = [
//   {
//     path: '',
//     component: LayoutComponent,
//     /*children: [
//       { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//       {
//         path: 'dashboard',
//         loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
//       },
//       {
//         path: 'component',
//         loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
//       }
//     ]*/
//   },
//   /*{
//     path: '**',
//     redirectTo: '/dashboard'
//   }*/
// ];
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      // { path: 'progress', component: ProgressComponent },
      // { path: 'grafica1', component: Grafica1Component },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
