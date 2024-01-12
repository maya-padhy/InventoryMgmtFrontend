import { Component, ViewChild } from '@angular/core';
import { NetworkAssetService } from '../network-asset.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent {
  customerName: string = '';
  customerEmail: string = '';
  customerPhone: string = '';
  customerAddress: string = '';
  selectedAssets: any[] = [];
  selectedAsset: string = '';
  assetQuantities: { [key: string]: number } = {};
  assets: any[] = []; // Load this array from your API
  newassets: any[] = [];
  showInvalidMessage = false;
  
  showConfirmationPopup = false;

  @ViewChild('dispatchForm')
  dispatchForm!: NgForm;


  constructor(private networkAssetService: NetworkAssetService) {
    

   }


  ngOnInit(): void {
    // Load assets when the component initializes
    this.loadAssets();
  }

  addAsset() {
    if (this.selectedAsset && this.assetQuantities[this.selectedAsset] > 0) {
      const selectedAssetObj = this.assets.find(asset => asset.name === this.selectedAsset);
      if (selectedAssetObj) {
        this.selectedAssets.push({ id: selectedAssetObj.id, name: this.selectedAsset, quantity: this.assetQuantities[this.selectedAsset] });
        this.selectedAsset = ''; // Clear the selected asset
        this.assetQuantities[this.selectedAsset] = 0; // Clear the quantity
      }
    }
  }



  s:any;
  dispatchInventory() {
    const dispatchAssets = this.selectedAssets.map(selectedAsset => ({
      assetName: selectedAsset.name,
      quantity: selectedAsset.quantity,
      customerId:0
    }));
    this.s = dispatchAssets;
    console.log(this.s)
    console.log(this.selectedAssets)
    console.log("Dispatch inventory",dispatchAssets)
    // Create a DispatchRequest object based on selected assets and customer details
    const dispatchData = {
        customerName: this.customerName,
        customerEmail: this.customerEmail,
        customerPhone: this.customerPhone,
        customerAddress: this.customerAddress,
        assets: dispatchAssets
    };
    console.log(this.s)
    // Make an HTTP POST request to dispatch inventory
    this.networkAssetService.dispatchInventory(dispatchData).subscribe(
        (data: any) => {
            console.log('Inventory dispatched successfully:', data);
            console.log("unloood"+dispatchAssets);
            Swal.fire({
              icon: 'success',
              title: 'Inventory Dispatched Successfully',
              text: 'Inventory has been dispatched successfully.',
            });
            this.unloadInventory(dispatchAssets); // Call the unloadInventory function after dispatching
            console.log(dispatchAssets);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error Dispatching Inventory',
            text: 'There was an error dispatching the inventory. Please try again.',
          });
            console.error('Error dispatching inventory:', error);
        }
    );
}

unloadInventory(dispatchAssets: any) {
    // Create an array of DispatchAsset objects based on selected assets and quantities
    console.log("select assests ",this.s)
    // const unloadData = this.selectedAssets.map(selectedAsset => ({
    //     id: selectedAsset.id,
    //     quantity: selectedAsset.quantity
    // }));
    // console.log("Unload inv",unloadData)

    // Make an HTTP PUT request to unload inventory
    this.networkAssetService.unloadInventory(this.s).subscribe(
        (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Inventory Unloaded Successfully',
            text: 'Inventory has been unloaded successfully.',
          });
            console.log('Inventory unloaded successfully:', data);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error Unloading Inventory',
            text: 'There was an error unloading the inventory. Please try again.',
          });
            console.error('Error unloading inventory:', error);
        }
    );
}
showConfirmation() {
  if (this.dispatchForm.invalid) {
    this.showInvalidMessage = true;
  }
  this.showConfirmationPopup = true;
}

confirmDispatch() {
  // Perform the dispatchInventory function here
  this.dispatchInventory();

  // Reset the form and hide the confirmation popup
  this.resetForm();
}

cancelDispatch() {
  // Hide the confirmation popup
  this.showConfirmationPopup = false;
}

resetForm() {
  this.customerName = '';
  this.customerEmail = '';
  this.customerPhone = '';
  this.customerAddress = '';
  this.selectedAssets = [];
  this.assetQuantities = {};

  // Hide the confirmation popup
  this.showConfirmationPopup = false;
}
  
removeAsset(asset: any) {
  const index = this.selectedAssets.indexOf(asset);
  if (index !== -1) {
    this.selectedAssets.splice(index, 1);
  }
}




organizedAssets: any[] = [];


loadAssets() {
  // Use your network asset service to load assets (replace with actual service method)
  this.networkAssetService.getAllNetworkAssets().subscribe(
    (data: any[]) => {
      // Normalize the search query by removing spaces and converting to lowercase
      this.assets=data;
      console.log("loading321",data);
      
      // Filter assets based on the selected types, selected suppliers, and search query
      // this.organizedAssets = this.organizeAssetsByType(data);
      const deactivatedAssets = data.filter(asset => asset.status === "Active");

      // Pass the filtered data to the organizeAssetsByType function
      this.organizedAssets = this.organizeAssetsByType(deactivatedAssets);
    },
    (error) => {
      console.error('Error loading assets:', error);
    }
  );
}

isInvalidField(field: any): boolean {
  return field.invalid && (field.dirty || field.touched);
}


organizeAssetsByType(assets: any[]): any[] {
  const organizedAssets: any[] = [];
  assets.forEach((asset) => {
    const assetType = asset.type;
    const existingType = organizedAssets.find((group) => group.type === assetType);
    if (existingType) {
      existingType.assets.push(asset);
    } else {
      organizedAssets.push({
        type: assetType,
        assets: [asset],
      });
    }
  });
  return organizedAssets;
}

} 


