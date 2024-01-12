import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9090/api/users'; // Replace with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  approveUser(userId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/approve/${userId}`, {});
  }

  deleteUser(userId: number): Observable<any> {
    console.log("deleteservice");
    return this.http.delete<any>(`${this.apiUrl}/delete/${userId}`, {});
  }

  
  login(username: string, password: string): Observable<any> {
    // Make an HTTP request to your Spring Boot backend for user authentication
    const credentials = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  
  getUserByUsername(username: string) {
    return this.http.get(`${this.apiUrl}/${username}`);
  }

  updateUser(user:any,editeduser: any) {
  console.log("HSDFGHWERTHJ");
  console.log(user);
  console.log(editeduser);
    return this.http.put(`${this.apiUrl}/update/${user}`, editeduser);
  }
}
