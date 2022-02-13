import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app/app/app.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserComponent } from './components/user/user/user.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'app/:appId', component: AppComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
