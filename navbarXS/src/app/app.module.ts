import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import{FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import {ToastrModule} from 'ngx-toastr'
import { ResponseResetPasswordComponent } from './response-reset-password/response-reset-password.component';
import { PhoneVerficationComponent } from './phone-verfication/phone-verfication.component';
import { MatSliderModule } from '@angular/material/slider';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatSidenavModule, MatToolbarModule, MatCardModule,
} from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import {MatMenuModule} from '@angular/material/menu';
import { CreateCategoryComponent } from './admin/create-category/create-category.component';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PanierComponent } from './panier/panier.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { CartComponent } from './cart/cart.component';
import { CommandsComponent } from './admin/commands/commands.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ResetPasswordComponent,
    ResponseResetPasswordComponent,
    PhoneVerficationComponent,
    MainNavComponent,
    ProfileComponent,
    AdminComponent,
    CreateCategoryComponent,
    CreateProductComponent,
    EditProductComponent,
    EditCategoryComponent,
    DashboardComponent,
    PanierComponent,
    ProductComponent,
    CheckoutComponent,
    PurchasesComponent,
    CartComponent,
    CommandsComponent
  ],
  imports: [
    RouterModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        progressBar:true,
        progressAnimation:'increasing'
      }
    ),
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule
    
    
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
