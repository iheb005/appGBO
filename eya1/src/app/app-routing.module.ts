import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
//import { RegisterComponent } from './auth/register/register.component';
import {HomePComponent} from './home-p/home-p.component';
import {AnnexeComponent} from './rbo/annexe/annexe.component';
import {FactureComponent} from './rbo/facture/facture.component';
import {HomeComponent} from './rbo/home/home.component';
import {StatistiqueComponent} from './rbo/statistique/statistique.component';
import {HomeRsComponent} from './rs/home-rs/home-rs.component';
import {AuthGuard} from "./_herlpers/AuthGuard";
import {RoleRBOGuard} from "./_herlpers/RoleRBOGuard";
import {UnauthorizedComponent} from "./auth/unauthorized/unauthorized.component";
import {RoleRSGuard} from "./_herlpers/RoleRSGuard";
import {UsersComponent} from "./admin/users/users.component";
import {StructuresComponent} from "./admin/structures/structures.component";
import {RoleAdminGuard} from "./_herlpers/RoleAdminGuard";
import {LandingComponent} from "./landing/landing.component";
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';


const routes: Routes = [
  {
    path: 'rbo', canActivate: [AuthGuard, RoleRBOGuard],
    children: [
      {
        path: '', // child route path
        component: HomeComponent, // child route component that the router renders
        data: {
          role: 'ROLE_RBO'
        }
      },
      {
        path: 'home', // child route path
        component: HomeComponent, // child route component that the router renders
      },
    
      {
        path: 'stat',// child route path
        component: StatistiqueComponent, // child route component that the router renders
      },
      {
        path: 'facture', // child route path
        component: FactureComponent, // child route component that the router renders
      },
 //  {path: 'facture/:id', component: AnnexeComponent},


    ],


  },

  {
    path: 'admin', canActivate: [AuthGuard, RoleAdminGuard],
    children: [
    
      {
        path: 'users', // child route path
        component: UsersComponent, // child route component that the router renders
      },
      {
        path: 'structures', // child route path
        component: StructuresComponent, // child route component that the router renders
      },
      {
        path: 'stat',// child route path
        component: StatistiqueComponent, // child route component that the router renders
      },
      {
        path: '',// child route path
        component: HomeAdminComponent, // child route component that the router renders
      },
    
    
     
    ],

  },

  {
    path: 'rs', canActivate: [AuthGuard, RoleRSGuard],
    children: [
      {
        path: 'home', // child route path
        component: HomeRsComponent, // child route component that the router renders
      },
    
    ],
  },
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: 'login', component: LoginComponent},
  {path: 'welcome', component: LandingComponent},
  {path: 'home1', component: HomePComponent},
  {path: '', redirectTo: '/home1', pathMatch: 'full'},
  {path: 'facture/:id', component: AnnexeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
