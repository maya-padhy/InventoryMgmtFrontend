import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseUrl = 'http://localhost:9090/api/suppliers'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  // Implement methods to make API calls for CRUD operations

  // Method to create a new supplier
  createSupplier(supplier: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, supplier);
  }

  // Method to get all suppliers
  getAllSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Method to get a specific supplier by ID
  getSupplierById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Method to update a supplier
// Method to update a supplier
updateSupplier(supplier: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/${supplier.id}`, supplier);
}


  // Method to delete a supplier
  deleteSupplier(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  
  // Method to get network assets supplied by a specific supplier
  getAssetsSuppliedBySupplier(supplierName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${supplierName}/supplied-assets`);
  }
  
}
