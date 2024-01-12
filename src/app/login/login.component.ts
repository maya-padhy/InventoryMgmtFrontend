// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm: FormGroup;

//   constructor(private formBuilder: FormBuilder, private router: Router) {
//     // Initialize the form with validation rules
//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     // Handle the form submission here
//     if (this.loginForm.valid) {
//       const username = this.loginForm.value.username;
//       const password = this.loginForm.value.password;

//       // Check if the entered username and password are "admin"
//       if (username === 'admin' && password === 'admin') {
//         // Redirect to the admin dashboard or any desired page
//         this.router.navigate(['/dashboard']);
//       } else {
//         // Handle invalid credentials (show an error message, for example)
//         console.error('Invalid credentials');
//       }
//     }
//   }
// }


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LocalStorageService } from 'ngx-webstorage'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  username:string='';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: UserService ,
    private localStorage: LocalStorageService
  ) {
    // Initialize the form with validation rules
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = '';

    // Handle the form submission here
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      if (username === 'admin' && password === 'admin') {
        // Super admin login
        this.router.navigate(['/dashboard']);
        sessionStorage.setItem('username',username);

      } 
      
      else {
        // Regular user login
        this.authService.login(username, password).subscribe(
          (response) => {
            // Check the response from the authentication service
            if (response.approved) {
              // User is approved, allow login
              this.router.navigate(['/dashboard']);
              
                console.log("Before session",username);
                sessionStorage.setItem('username',username);
                console.log("User",username);
              
              

              
            } else {
              // User is not approved, set an error message
              this.errorMessage = 'Invalid Credentials';
            }
          },
          (error) => {
            // Handle other errors (e.g., invalid credentials)
            this.errorMessage = 'Not approved by Superadmin';
          }
        );
      }
    }
  }



}
