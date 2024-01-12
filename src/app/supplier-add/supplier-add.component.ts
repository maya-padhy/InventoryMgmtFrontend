import { Component } from '@angular/core';
import { SupplierService } from '../supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent {
  supplier: any = {};

  constructor(private supplierService: SupplierService) { }

  // onSubmit() {
  //   this.supplierService.createSupplier(this.supplier).subscribe(
  //     (data: any) => {
  //       console.log('Supplier added successfully:', data);
  //       // Clear the form after successful submission
  //       this.supplier = {};
  //     },
  //     (error: any) => {
  //       console.error('Error adding supplier:', error);
  //     }
  //   );
  // }

  onSubmit() {
    this.supplierService.createSupplier(this.supplier).subscribe(
      (data: any) => {
        // Show success swal alert
        Swal.fire({
          icon: 'success',
          title: 'Supplier added successfully',
          text: 'Supplier has been added successfully.',
        });

        // Clear the form after successful submission
        this.supplier = {};
      },
      (error: any) => {
        console.error('Error adding supplier:', error);
      }
    );
  }


}
