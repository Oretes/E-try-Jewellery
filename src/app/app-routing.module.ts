import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {AdminLoginComponent} from './admin-login/admin-login.component'
import {AuthGuardService} from './services/auth-guard.service';
import {CanvasComponent} from './canvas/canvas.component';
import {ContactComponent} from './contact/contact.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PaymentComponent} from './payment/payment.component';
import {AuthenticationGuard} from './services/authentication.guard';
const routes: Routes = [
  {
    path:'',
    component: NavbarComponent,
  },
  {
    path: 'pay',
    component:PaymentComponent
   },

  {
    path: 'camera',
    component: CanvasComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthenticationGuard],

    },
  {
    path: 'admin',
    component:AdminComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'admin/category',
    component:AdminComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'login',
    component:AdminLoginComponent
  },
  {
    path: '**',
    redirectTo: '/'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
