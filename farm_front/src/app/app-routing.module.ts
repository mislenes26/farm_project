import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { FarmComponent } from './farm/farm.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'farm', component: FarmComponent },
  { path: 'list', component: ListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:id', component: RegisterComponent },
  { path: 'details/:id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
