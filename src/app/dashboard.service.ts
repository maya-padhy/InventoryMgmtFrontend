import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  // Define your API endpoints for network assets and dispatch requests here




  getNetworkAssets(): Observable<any[]> {
    const url = 'http://localhost:9090/api/network-assets'; // Replace with your API endpoint
    return this.http.get<any[]>(url);
  }
  
  // Method to get dispatch requests
  getDispatchRequests(): Observable<any[]> {
    const url = 'http://localhost:9090/api/network-assets/dispatch/dispatch-history'; // Replace with your API endpoint
    return this.http.get<any[]>(url);
  }
}
