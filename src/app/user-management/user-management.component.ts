import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  registrationForm: FormGroup;
  users: any[] = []; // Use 'any' to represent generic objects
  errorMessage: string = '';
  users$!: Observable<any[]>; // Use an observable for user data
  username: any;
  isAdmin:boolean=false;


  constructor(private formBuilder: FormBuilder, private userService: UserService,private cdr: ChangeDetectorRef) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]], // Username is required and must be at least 4 characters
      email: ['', [Validators.required, Validators.email]], // Email is required and must be a valid email
      password: ['', [Validators.required, Validators.minLength(6)]], // Password is required and must be at least 6 characters
      // You can add more form controls and validation rules as needed
      phnno: ['', [Validators.required, Validators.pattern("^[0-9]*$")]], // Phone number with numeric digits
      role: ['', Validators.required] // Role selection is required
    });
  }
  
  ngOnInit() {
    // ...
    this.getUsers();
    this.username = sessionStorage.getItem('username');
    if(this.username=='admin')
    {
      this.isAdmin=true;
    }

  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        this.users = users;
      },

      (error: any) => {
        this.errorMessage = 'Failed to fetch user data.';
      }
    );
  }



  approveUser(userId: number) {
    this.userService.approveUser(userId).subscribe(
      (user: any) => {
        // Handle the approved user
        const index = this.users.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.users[index].approvedBySuperAdmin = true;
          user.approvedBySuperAdmin = !user.approvedBySuperAdmin;
          this.getUsers();
          console.log("Hi User man-Approve");


        }
      },
      (error: any) => {
        this.getUsers();

        this.errorMessage = 'Failed to approve the user.';
      }
    );
  }



  deleteUser(userId: number) {
    console.log("HEYYYYYYYYYYYYYYYYYY");
    this.userService.deleteUser(userId).subscribe(
      (user: any) =>  {
        this.users = this.users.filter(u => u.id !== userId);
        user.deleted = !user.deleted;
        this.getUsers();
        console.log("Hi User man-Approve");

      },
      (error: any) => {
        this.getUsers();

        this.errorMessage = 'Failed to approve the user.';
      }
    );
  }
}
