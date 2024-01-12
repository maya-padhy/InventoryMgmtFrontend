import { Component, OnInit } from '@angular/core';
import { NetworkAssetService } from '../network-asset.service';
import { SupplierService } from '../supplier.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnInit {
  assets: any[] = [];
  showAssetModal: boolean = false;
  selectedAsset: any | null = null;
  organizedAssets: any[] = [];
  isEditMode: boolean = false;
  originalAssetData: any | null = null; 
  searchQuery: string = ''; 
  selectedTypes: string[] = [];
  selectedSupplier: string | null = null; // Selected supplier
  allTypes: string[] = [];
  allSuppliers: string[] = []; // All available suppliers
  selectedSuppliers: string[] = []; // Selected suppliers
  unstockQty: number = 0;
  restockQty: number = 0;
  minQtyLimit: number = 10; // Initialize with the minimum quantity limit you want

  minQtyLimit1: number | null = null; 


  constructor(
    private networkAssetService: NetworkAssetService,
    private supplierService: SupplierService // Inject the supplier service
  ) { }

  ngOnInit(): void {
    // Load assets when the component initializes
    this.loadAssets();
    this.loadAllTypes();
    this.loadAllSuppliers(); // Load all available suppliers
    this.selectedAsset = null;
  }

  loadAllTypes() {
    // Use your network asset service to load all asset types (replace with actual service method)
    this.networkAssetService.getAllAssetTypes().subscribe(
      (data: string[]) => {
        this.allTypes = data;
        console.log(this.allTypes);
      },
      (error) => {
        console.error('Error loading asset types:', error);
      }
    );
  }

  

  loadAllSuppliers() {
    // Use your supplier service to load all suppliers
    this.supplierService.getAllSuppliers().subscribe(
      (data: any[]) => {
        this.allSuppliers = data.map(supplier => supplier.name);
        
      },
      (error) => {
        console.error('Error loading suppliers:', error);
      }
    );
  }
  
  loadAssets() {
    // Use your network asset service to load assets (replace with actual service method)
    this.networkAssetService.getAllNetworkAssets().subscribe(
      (data: any[]) => {
        // Normalize the search query by removing spaces and converting to lowercase
        const normalizedSearchQuery = this.normalizeString(this.searchQuery);
  
        // Filter assets based on the selected types, selected suppliers, and search query
        this.organizedAssets = this.organizeAssetsByType(data.filter(asset =>
          (this.selectedTypes.length === 0 || this.selectedTypes.includes(asset.type)) &&
          (this.selectedSuppliers.length === 0 || this.selectedSuppliers.includes(asset.supplierName)) &&
          this.isMatch(asset.name, normalizedSearchQuery)
        )
        );
      },
      (error) => {
        console.error('Error loading assets:', error);
      }
    );

  }



  onMinQtyLimitChange() {
    // Reload assets based on the updated minimum quantity limit
    this.loadAssets();
  }
  
  

  normalizeString(input: string): string {
    // Remove spaces and convert to lowercase
    return input.replace(/\s+/g, '').toLowerCase();
  }

  isMatch(input: string, query: string): boolean {
    // Normalize the input and query for case-insensitive matching
    const normalizedInput = this.normalizeString(input);
    const normalizedQuery = this.normalizeString(query);

    // Check if the normalized input contains the normalized query
    return normalizedInput.includes(normalizedQuery);
  }

  showAssetDetails(asset: any) {
    console.log("showing asset  details...");
    this.selectedAsset = asset;
    this.originalAssetData = { ...asset }; // Store a copy of the original asset data
    this.showAssetModal = true;

  }

  onSearchQueryChange() {
    this.loadAssets(); // Reload assets based on the updated search query
  }

  onTypeChange() {
    if (this.selectedTypes.includes("")) {
      // If "All" is selected, clear the selected types array to display all assets
      this.selectedTypes = [];
    }
    this.loadAssets(); // Reload assets based on the updated type
  }

  onSupplierChange() {
    // Check if "All" is selected and set selectedSuppliers accordingly
    if (this.selectedSuppliers.includes("")) {
      this.selectedSuppliers = [];
    }
    this.loadAssets(); // Reload assets based on the updated suppliers
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

  closeAssetModal() {
    this.selectedAsset = null;
    this.isEditMode = false; // Reset edit mode when closing the modal
  }

  toggleAssetStatus(asset: any) {
    // Check if the asset is Deactivated
    if (asset.status === 'Deactivated') {
      // If Deactivated, set it to Active
      asset.status = 'Active';
    } else {
      // If Active, set it to Deactivated
      asset.status = 'Deactivated';
    }

    this.networkAssetService.toggleAssetStatus(asset.id).subscribe(
      (data) => {
        // Handle success, e.g., show a success message
        console.log('Asset status updated successfully:', data);
      },
      (error) => {
        console.error('Error updating asset status:', error);
      }
    );
  }



  toggleEditMode(asset: any) {
    // Enter edit mode for the selected asset
    this.isEditMode = true;
    this.selectedAsset = { ...asset }; // Make a copy of the asset for editing
  }

  saveChanges(asset: any) {
    // Call your service method to save changes to the selected asset
    this.networkAssetService.updateNetworkAsset(asset.id, asset).subscribe(
      (data) => {
        // Handle success, e.g., show a success message
        console.log('Asset updated successfully:', data);
        this.isEditMode = false; // Exit edit mode after saving changes
        this.selectedAsset = null; // Clear the selected asset
      },
      (error) => {
        console.error('Error updating asset:', error);
      }
    );
  }

  cancelUpdate() {
    // Restore the original asset data and exit edit mode
    this.selectedAsset = null; // Clear the edited asset
    this.isEditMode = false; // Exit edit mode
    this.loadAssets();
  }

  // deleteAsset(id: number) {
  //   if (confirm('Are you sure you want to delete this asset?')) {
  //     this.networkAssetService.deleteNetworkAsset(id).subscribe(
  //       () => {
  //         // Handle success, e.g., show a success message
  //         console.log('Asset deleted successfully');
  //         this.selectedAsset = null; // Clear the selected asset
  //         this.loadAssets(); // Reload assets after deletion
  //       },
  //       (error) => {
  //         console.error('Error deleting asset:', error);
  //       }
  //     );
  //   }
  // }


  deleteAsset(id: number) {
    Swal.fire({
      title: 'Delete Asset',
      text: 'Are you sure you want to delete this asset? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.networkAssetService.deleteNetworkAsset(id).subscribe(
          () => {
            Swal.fire(
              'Deleted',
              'The asset has been successfully deleted.',
              'success'
            );
            this.selectedAsset = null;
            this.loadAssets();
          },
          (error) => {
            console.error('Error deleting asset:', error);
            Swal.fire(
              'Error',
              'An error occurred while deleting the asset.',
              'error'
            );
          }
        );
      }
    });
  }

  calculateTotalPrice(asset: any): number {
    return asset.qty * asset.price;
  }



  filterOption: string = 'All'; // Default to 'All'
  showFilters: boolean = false;
  activeFilters: string[] = [];


  onFilterOptionChange() {
    if (this.filterOption === 'All') {
      this.showFilters = false;
      this. resetFilter();
    } else {
      this.showFilters = true;
    }
  }






  
  applyFilter() {
    this.activeFilters = [];

    if (this.selectedTypes.length > 0) {
      console.log(this.activeFilters);
      this.activeFilters.push(`Type: ${this.selectedTypes.join(', ')}`);
      console.log(this.activeFilters);
    }

    if (this.selectedSuppliers.length > 0) {
      this.activeFilters.push(`Supplier: ${this.selectedSuppliers.join(', ')}`);
    }

    if (this.minQtyLimit) {
      this.activeFilters.push(`Min Quantity: ${this.minQtyLimit}`);
    }

    this.loadAssets();
  }

  removeFilter(filter: string) {
    if (filter.startsWith('Type')) {
      console.log(2345);
      // this.selectedTypes = this.selectedTypes.filter(t => t !== filter.split(': ')[1]);
      this.selectedTypes = [];

      console.log(this.selectedTypes);
    } else if (filter.startsWith('Supplier')) {
      // this.selectedSuppliers = this.selectedSuppliers.filter(s => s !== filter.split(': ')[1]);
      this.selectedSuppliers=[]
    } else if (filter.startsWith('Min Quantity')) {
      this.minQtyLimit = 0;
    }

    this.activeFilters = this.activeFilters.filter(f => f !== filter);
    this.loadAssets();
  }

 
  

  resetFilter() {
    this.filterOption = 'All';
    this.showFilters = false;
    this.selectedTypes = [];
    this.selectedSuppliers = [];
    this.minQtyLimit = 10;
    this.activeFilters = [];
    this.loadAssets();
  }

  onFilterChange() {
    this.applyFilter();
    // Reload assets based on the updated filter criteria
    this.loadAssets();
  }

  exportExcel() {
    console.log("EXPORRRRRRRT");
    const data = this.organizedAssets.flatMap(assetGroup =>
      assetGroup.assets.map((asset: { id: any; name: any; type: any; supplierName: any; model: any; qty: any; price: any; status: any; }) => ({
        ID: asset.id,
        Name: asset.name,
        Type: asset.type,
        Supplier: asset.supplierName,
        Model: asset.model,
        Quantity: asset.qty,
        Price: asset.price,
        'Total Price': this.calculateTotalPrice(asset),
        Status: asset.status,
      }))
    );
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'NetworkAssets');
  
    XLSX.writeFile(wb, 'network_assets.xlsx');
  }


  
  

}