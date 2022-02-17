import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app/app/app.component';
import { DashboardComponent } from './components/app/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login/login.component';
import { UserComponent } from './components/login/user/user.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'app', children: [ { path: ':appId', component: AppComponent } ] },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
