import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/index';
import { AdminLoginComponent } from './admin-login/index';
import { AuthGuard } from "./authTokenManage/index";
import { HomeComponent } from "./home/index";

const appRoutes: Routes = [
    {
      path: 'login',
      component: LoginFormComponent,
      data: { title: 'Login Form' }
    },
    {
        path: 'adlogin',
        component: AdminLoginComponent,
        data: { title: 'Admin Login' }
    },
    {
        path: '',
        component: HomeComponent,
        // canActivate: [AuthGuard],
        data: { title: 'home page' }
    }
]


export const routing = RouterModule.forRoot(
    appRoutes, {
      enableTracing: true
    }
);
