import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkAssetService {
  private baseUrl = 'http://localhost:9090/api/network-assets'; 

  constructor(private http: HttpClient) { }

  // Implement methods to make API calls for CRUD operations

  // Method to create a new network asset
  createNetworkAsset(networkAsset: any): Observable<any> {
    console.log(2345678);
    console.log("Maya",networkAsset);
    return this.http.post(`${this.baseUrl}`, networkAsset);
  }

  // Method to get all network assets
  getAllNetworkAssets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Method to get a specific network asset by ID
  getNetworkAssetById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Method to update a network asset
  updateNetworkAsset(id: number, networkAsset: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, networkAsset);
  }

  // Method to delete a network asset
  deleteNetworkAsset(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }



  toggleAssetStatus(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/toggle-status/${id}`, null);
  }
  
  getAllAssetTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/asset-types`);
  }

  addAssetType(newType: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/asset-types`, newType);
  }

  deleteAssetType(type: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/asset-types/${type}`);

  }

  
unstockAsset(assetId: number, quantity: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/unstock/${assetId}?unstockQty=${quantity}`, {});
}
restockAsset(assetId: number, quantity: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/restock/${assetId}?restockQty=${quantity}`, {});
}





dispatchInventory(dispatchData: any): Observable<any> {
  console.log("asdfgh");
  return this.http.post<any>(`${this.baseUrl}/dispatch`, dispatchData);
}

unloadInventory(dispatchData: any): Observable<any> {
  console.log("hhhhhhhh");
  return this.http.put(`${this.baseUrl}/dispatch/update-quantity`, dispatchData);
}

// getDispatchHistory(): Observable<any[]> {
//   return this.http.get<any[]>(`${this.baseUrl}/dispatch/dispatch-history`);
// }

getDispatchHistoryWithAssets(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/dispatch/dispatch-history`);
}

getSuppliersByAssetQty(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/suppliers-by-qty`);
}

}
