// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.css']
// })
// export class UserProfileComponent {

  
//   username:any;
//   userdetails:any;
//   constructor(
//     private route: ActivatedRoute,
//     private userService: UserService
//   ) {}

//   ngOnInit() {

//     this.username = sessionStorage.getItem('username');
//     if (this.username) {
//         this.userService.getUserByUsername(this.username).subscribe(user => {
//           this.userdetails = user;
//         });
//       }

    
//   }

// }

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  username: any;
  userdetails: any;
  editMode: boolean = false;
  editedUser: any;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    if (this.username) {
      this.userService.getUserByUsername(this.username).subscribe((user) => {
        this.userdetails = user;
        this.editedUser = { ...user }; // Create a copy for editing
      });
    }
  }
  loaduserdetails(){
    if (this.username) {
      this.userService.getUserByUsername(this.username).subscribe((user) => {
        this.userdetails = user;
        this.editedUser = { ...user }; // Create a copy for editing
      });
    }
  }

  enableEditMode() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.editedUser = { ...this.userdetails }; // Restore original data
  }

  saveChanges() {
    
    this.editMode = false;
    console.log(this.userdetails.id);
    console.log(this.editedUser);
    // Send editedUser to the server to save changes
    this.userService.updateUser(this.userdetails.id,this.editedUser).subscribe((response) => {
      // Handle response, e.g., show success message
      console.log("Hi");
      
    
    },
    (error) => {
      this.loaduserdetails();
    }
    
    
    );
    

  }

 
}
