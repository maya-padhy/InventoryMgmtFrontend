import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:9090/api/users'; // Replace with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  registerUser(userData: any) {
    // Send a POST request to the Spring Boot backend to register the user
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
