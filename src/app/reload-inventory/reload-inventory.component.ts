// import { Component } from '@angular/core';
// import { NetworkAssetService } from '../network-asset.service';

// @Component({
//   selector: 'app-reload-inventory',
//   templateUrl: './reload-inventory.component.html',
//   styleUrls: ['./reload-inventory.component.css']
// })
// export class ReloadInventoryComponent {
//   assetId: number | null = null;
//   selectedAsset: any | null = null;
//   newQty: number | null = null;

//   constructor(private networkAssetService: NetworkAssetService) { }

//   searchAsset() {
//     if (this.assetId) {
//       this.networkAssetService.getNetworkAssetById(this.assetId).subscribe(
//         (data: any) => {
//           this.selectedAsset = data;
//           this.newQty = null; // Reset new quantity when a new asset is selected
//         },
//         (error: any) => {
//           console.error('Error loading asset:', error);
//           this.selectedAsset = null;
//         }
//       );
//     }
//   }

//   reloadQuantity() {
//     if (this.selectedAsset && this.newQty !== null) {
//       const assetId = this.selectedAsset.id;
//       const restockQty = this.newQty;

//       this.networkAssetService.restockAsset(assetId, restockQty).subscribe(
//         (data: any) => {
//           console.log('Quantity updated successfully:', data);

//           // Increase the displayed quantity
//           this.selectedAsset.qty += restockQty;

//           this.newQty = null; // Reset new quantity after updating
//         },
//         (error: any) => {
//           console.error('Error updating quantity:', error);
//         }
//       );
//     }
//   }


//   unloadQuantity() {
//     if (this.selectedAsset && this.newQty !== null) {
//       const assetId = this.selectedAsset.id;
//       const unstockQty = this.newQty;
  
//       this.networkAssetService.unstockAsset(assetId, unstockQty).subscribe(
//         (data: any) => {
//           console.log('Quantity updated successfully:', data);
  
//           // Decrease the displayed quantity
//           this.selectedAsset.qty -= unstockQty;
  
//           this.newQty = null; // Reset new quantity after updating
//         },
//         (error: any) => {
//           console.error('Error updating quantity:', error);
//         }
//       );
//     }
//   }

// }
import { Component } from '@angular/core';
import { NetworkAssetService } from '../network-asset.service';

@Component({
  selector: 'app-reload-inventory',
  templateUrl: './reload-inventory.component.html',
  styleUrls: ['./reload-inventory.component.css']
})
export class ReloadInventoryComponent {
  assetId: number | null = null;
  selectedAsset: any | null = null;
  newQty: number | null = null;
  selectedOperation: string = 'reload'; // Default to 'reload'

  constructor(private networkAssetService: NetworkAssetService) { }

  searchAsset() {
    if (this.assetId) {
      this.networkAssetService.getNetworkAssetById(this.assetId).subscribe(
        (data: any) => {
          this.selectedAsset = data;
          this.newQty = null; // Reset new quantity when a new asset is selected
        },
        (error: any) => {
          console.error('Error loading asset:', error);
          this.selectedAsset = null;
        }
      );
    }
  }

  updateQuantity() {
    if (this.selectedAsset && this.newQty !== null) {
      const assetId = this.selectedAsset.id;
      const quantity = this.newQty;

      if (this.selectedOperation === 'reload') {
        this.networkAssetService.restockAsset(assetId, quantity).subscribe(
          (data: any) => {
            console.log('Quantity updated successfully:', data);
            this.selectedAsset.qty += quantity; // Increase the displayed quantity
            this.newQty = null; // Reset new quantity after updating
          },
          (error: any) => {
            console.error('Error updating quantity:', error);
          }
        );
      } else if (this.selectedOperation === 'unload') {
        this.networkAssetService.unstockAsset(assetId, quantity).subscribe(
          (data: any) => {
            console.log('Quantity updated successfully:', data);
            this.selectedAsset.qty -= quantity; // Decrease the displayed quantity
            this.newQty = null; // Reset new quantity after updating
          },
          (error: any) => {
            console.error('Error updating quantity:', error);
          }
        );
      }
    }
  }
}
