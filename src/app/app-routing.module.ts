// Import necessary modules and components
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { ReloadInventoryComponent } from './reload-inventory/reload-inventory.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { DispatchHistoryComponent } from './dispatch-history/dispatch-history.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ApidocComponent } from './apidoc/apidoc.component';

// Define the routes
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'asset-details', component: AssetDetailsComponent },
  { path: 'add-asset', component: AddAssetComponent },
  { path: 'supplier-add', component: SupplierAddComponent },
  { path: 'supplier-list', component: SupplierListComponent },
  { path: 'adjust-stock', component: ReloadInventoryComponent },
  { path: 'dispatch', component: DispatchComponent },
  { path: 'dispatch-history', component: DispatchHistoryComponent },
  { path: 'user-profile', component: UserProfileComponent },
  {path:'apidoc',component:ApidocComponent},


  
  // Default route:
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
