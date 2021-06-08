import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './common/header/header.component';
import {FooterComponent} from './common/footer/footer.component';
import {HomeComponent} from './rbo/home/home.component';
import {UsersComponent} from './admin/users/users.component';
import {StructuresComponent} from './admin/structures/structures.component';
import {SidebarComponent} from './common/sidebar/sidebar.component';
import {FactureComponent} from './rbo/facture/facture.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StatistiqueComponent} from './rbo/statistique/statistique.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceService} from './service/service.service';
import {AnnexeComponent} from './rbo/annexe/annexe.component';
import {HomeRsComponent} from './rs/home-rs/home-rs.component';
import {HomePComponent} from './home-p/home-p.component';
import {LoginComponent} from './auth/login/login.component';
import {UnauthorizedComponent} from './auth/unauthorized/unauthorized.component';
import {LandingComponent} from './landing/landing.component';
import {AuthInterceptor} from './_herlpers/AuthInterceptor';
import { MatSelectFilterModule } from 'mat-select-filter';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import {NgxPaginationModule} from 'ngx-pagination'; 



@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UsersComponent,
    StructuresComponent,
    //RegisterComponent,
    SidebarComponent,
    FactureComponent,
    StatistiqueComponent,
    AnnexeComponent,
    HomeRsComponent,
    HomePComponent,
    LoginComponent,
    UnauthorizedComponent,
    LandingComponent,
    HomeAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    ChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectFilterModule ,
    MatSelectModule,
    ToastNoAnimationModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [
    ServiceService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
