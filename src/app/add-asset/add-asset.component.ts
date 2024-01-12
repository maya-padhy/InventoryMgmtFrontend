import { Component, OnInit, ViewChild } from '@angular/core';
import { NetworkAssetService } from '../network-asset.service';
import { SupplierService } from '../supplier.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
  assetTypes: string[] = []; // To store asset types from the backend
  newAsset: any = {
    name: '',
    type: '',
    supplierName: '',
    model: '',
    qty:'',
    status: 'Active'
  };
  newType: string = '';
  selectedType: string = '';
  suppliers: any[] = []; 

  constructor
  (
    private networkAssetService: NetworkAssetService,
    private supplierService: SupplierService
    ) { }

  ngOnInit(): void {
    // Load asset types when the component initializes
    this.loadAssetTypes();
    this.loadSuppliers();
  }

  loadAssetTypes() {
    // Use your network asset service to load asset types
    this.networkAssetService.getAllAssetTypes().subscribe(
      (data: string[]) => {
        this.assetTypes = data;
      },
      (error: any) => {
        console.error('Error loading asset types:', error);
      }
    );
  }

  addNewAssetType() {
    if (this.newType.trim() !== '') {
      // Check if the new type is not empty
      this.networkAssetService.addAssetType(this.newType).subscribe(
        (data: string) => {
          console.log('New asset type added:', data);
          this.loadAssetTypes(); // Reload the asset types list
          this.newType = ''; // Clear the new type input
        },
        (error: any) => {
          console.error('Error adding asset type:', error);
        }
      );
    }
  }

  // onSubmit() {
  //   // Call your network asset service to add the new asset
  //   this.networkAssetService.createNetworkAsset(this.newAsset).subscribe(
  //     (data) => {
  //       // Handle success, e.g., show a success message
  //       console.log('Asset added successfully:', data);
  //       // Clear the form
  //       this.newAsset = {
  //         name: '',
  //         type: '',
  //         supplierName: '',
  //         model: '',
  //         qty:'',
  //         price:'',
  //         status: 'Active'
  //       };
  //     },
  //     (error) => {
  //       console.error('Error adding asset:', error);
  //     }
  //   );
  // }


  onSubmit() {
    this.networkAssetService.createNetworkAsset(this.newAsset).subscribe(
      (data) => {
        // Handle success
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Asset added successfully!',
        });
  
        // Clear the form
        this.newAsset = {
          name: '',
          type: '',
          supplierName: '',
          model: '',
          qty: '',
          price: '',
          status: 'Active',
        };
      },
      (error) => {
        // Handle error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding the asset.',
        });
  
        console.error('Error adding asset:', error);
      }
    );
  }
  

  
  onDeleteAssetType() {
    if (!this.newAsset.type) {
      console.error('Please select an asset type.');
      return;
    }
  
    // Display a Swal confirmation dialog.
    Swal.fire({
      title: 'Confirm Deletion',
      text: `Do you really want to delete the asset type "${this.newAsset.type}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion.
        this.deleteAssetType();
      }
    });
  }
  
  deleteAssetType() {
    // Call your network asset service to delete the selected asset type.
    this.networkAssetService.deleteAssetType(this.newAsset.type).subscribe(
      () => {
        console.log(`Asset Type "${this.newAsset.type}" deleted successfully.`);
        // Optionally, update or refresh the assetTypes array after deletion.
        this.loadAssetTypes();
        // Clear the selected asset type.
        this.newAsset.type = '';
      },
      (error: any) => {
        console.error('Error deleting asset type:', error);
      }
    );
  }
  

  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(
      (data: any[]) => {
        this.suppliers = data;
      },
      (error: any) => {
        console.error('Error loading suppliers:', error);
      }
    );
  
  }
  
  isAddAssetTypeModalOpen: boolean = false;

  // Open the Add Asset Type Modal
  openAddAssetTypeModal() {
    this.isAddAssetTypeModalOpen = true;
  }

  // Close the Add Asset Type Modal
  closeAddAssetTypeModal() {
    this.isAddAssetTypeModalOpen = false;
  }
  
}








