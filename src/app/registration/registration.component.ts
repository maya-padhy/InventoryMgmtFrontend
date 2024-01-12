// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { RegistrationService } from '../registration.service';

// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.css']
// })
// export class RegistrationComponent {
//   registrationForm: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     private registrationService: RegistrationService
//     ) {
//     this.registrationForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       phoneNumber: ['', Validators.required],
//       role: ['Admin', Validators.required]
//     });  
//   }

//   onSubmit() {
//     if (this.registrationForm.valid) {
//       const registrationData = this.registrationForm.value;
      
//       this.registrationService.registerUser(registrationData).subscribe(
//         (response: any) => {
//           // Handle the response from the server (e.g., success message)
//           console.log('Registration successful:', response);
          
//           // You can show a success message or redirect to a different page
//         },
//         (error: { status: number; }) => {
//           // Handle any errors (e.g., validation errors, server errors)
//           console.error('Registration error:', error); 
//         }
//       );
//     }
//   }
  
// }


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  registrationSuccess: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: ['Admin', Validators.required]
    });
  }

  onSubmit() {
    this.registrationForm.markAllAsTouched(); // Mark all fields as touched to trigger validation
    if (this.registrationForm.valid) {
      const registrationData = this.registrationForm.value;
      this.registrationService.registerUser(registrationData).subscribe(
        (response: any) => {
          // Handle the response from the server (e.g., success message)
          console.log('Registration successful:', response);
          this.registrationSuccess = true; // Set the success flag to true
          this.registrationForm.reset();
        },
        (error: { status: number; }) => {
          // Handle any errors (e.g., validation errors, server errors)
          console.error('Registration error:', error);
        }
      );
    }
  }
}
