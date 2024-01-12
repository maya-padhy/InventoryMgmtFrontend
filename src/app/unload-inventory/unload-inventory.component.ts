import { Component } from '@angular/core';
import { NetworkAssetService } from '../network-asset.service';

@Component({
  selector: 'app-unload-inventory',
  templateUrl: './unload-inventory.component.html',
  styleUrls: ['./unload-inventory.component.css']
})
export class UnloadInventoryComponent {
  assetId: number | null = null;
  selectedAsset: any | null = null;
  newQty: number | null = null;

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

  unloadQuantity() {
    if (this.selectedAsset && this.newQty !== null) {
      const assetId = this.selectedAsset.id;
      const unstockQty = this.newQty;
  
      this.networkAssetService.unstockAsset(assetId, unstockQty).subscribe(
        (data: any) => {
          console.log('Quantity updated successfully:', data);
  
          // Decrease the displayed quantity
          this.selectedAsset.qty -= unstockQty;
  
          this.newQty = null; // Reset new quantity after updating
        },
        (error: any) => {
          console.error('Error updating quantity:', error);
        }
      );
    }
  }
  
}
