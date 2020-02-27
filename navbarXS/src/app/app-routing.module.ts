import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResponseResetPasswordComponent } from './response-reset-password/response-reset-password.component';
import { PhoneVerficationComponent } from './phone-verfication/phone-verfication.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { CreateCategoryComponent } from './admin/create-category/create-category.component';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {path:'' , component:HeaderComponent},
  {path:'products' , component:HeaderComponent},
  {path:'products/:id',component:ProductComponent},
  {path: 'cart', component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:"login" , component:LoginComponent},
  {path:"register" , component:RegisterComponent},
  {path:"resetPassword" , component:ResetPasswordComponent},
  {path:'response-reset-password', component:ResponseResetPasswordComponent},
  { path:'phone_verfication',component:PhoneVerficationComponent},
  {path:'profile',component:ProfileComponent},


  {
    path: 'admin', component:AdminComponent,
    children:
    [
      {path:'' , component:DashboardComponent},
      {path: 'newCategory', component:CreateCategoryComponent},
      {path: 'newProduct', component:CreateProductComponent},
      {path: 'editCategory', component:EditCategoryComponent},
      {path: 'editProduct', component:EditProductComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
