import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { ReloadInventoryComponent } from './reload-inventory/reload-inventory.component';
import { DispatchHistoryComponent } from './dispatch-history/dispatch-history.component';
// import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UnloadInventoryComponent } from './unload-inventory/unload-inventory.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocalStorageService } from 'ngx-webstorage'; // Import Ng2Webstorage
import { NgxWebstorageModule } from 'ngx-webstorage';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ApidocComponent } from './apidoc/apidoc.component';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AssetDetailsComponent,
    AddAssetComponent,
    SupplierAddComponent,
    SupplierListComponent,
    UnloadInventoryComponent,
    ReloadInventoryComponent,
    DispatchComponent,
    DispatchHistoryComponent,
    RegistrationComponent,
    UserManagementComponent,
    DashboardComponent,
    UserProfileComponent,
    ApidocComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgxWebstorageModule.forRoot(),
    
    
     
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
