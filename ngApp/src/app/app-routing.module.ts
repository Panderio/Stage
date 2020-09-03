import { AuthGuard } from './auth.guard';
import { DetailsCoursComponent } from './details-cours/details-cours.component';
import { BrowseComponent } from './browse/browse.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CatgComponent } from './catg/catg.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'

  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'catg',
    component: CatgComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'browse',
    component:BrowseComponent
  },
  {
    path:'details',
    component:DetailsCoursComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
