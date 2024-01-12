import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'network-inventory-frontend';
  // @ViewChild('sidebar') sidebar: ElementRef | undefined;

  constructor(private router: Router) {}


// isSidebarClosed = false;


openSubMenus: string[] = [];


isSidebarClosed = true; // Keep the sidebar closed by default

  // Add a click event listener to close the sidebar when clicking outside
  // @HostListener('document:click', ['$event'])
  // onClick(event: Event): void {
  //   if (this.isSidebarClosed) {
  //     console.log("Sidebar already closed");
  //     return; // Sidebar is already closed, no need to do anything
  //   }
    
  //   if (this.sidebar?.nativeElement.contains(event.target as Node)) {
  //     console.log("closing sidebar");
  //     this.isSidebarClosed = true; // Clicked outside, so close the sidebar
  //   }
  // }


  
   



toggleSidebar() {
  this.isSidebarClosed = !this.isSidebarClosed;
}



toggleSubMenu(menuName: string) {
  
  if (this.openSubMenus.includes(menuName)) {
    this.openSubMenus = this.openSubMenus.filter((item) => item !== menuName);
  } else {
    this.openSubMenus.push(menuName);
  }
}

isSubMenuOpen(menuName: string): boolean {

  return this.openSubMenus.includes(menuName);
}

isLoginPageOrRegisterPage(): boolean {
  return this.router.url.includes('/login') || this.router.url.includes('/register');
}

dataRemove(){
  sessionStorage.removeItem('username');
}

}
