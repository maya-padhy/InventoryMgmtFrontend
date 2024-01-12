import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  suppliers: any[] = [];
  editing: boolean[] = [];
  editedEmail: string[] = [];
  editedPhoneNumber: any[] = [];
  editedAddress: string[] = [];
  editedWebsite :string[]=[];
  supplierAssets: { [key: string]: any[] } = {};
  searchQuery: string = ''

  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(
      (data) => {
        this.suppliers = data;
        this.loadSupplierAssets();
        this.initializeEditingArrays();
        this.filterSuppliers();
        

      },
      (error) => {
        console.error('Error fetching suppliers:', error);
      }
    );
  }

  filterSuppliers() {
    if (this.searchQuery) {
      // Filter suppliers based on the search query
      this.suppliers = this.suppliers.filter((supplier) =>
        this.isMatch(supplier.name, this.searchQuery)
      );
    }
  }




  isMatch(input: string, query: string): boolean {
    // Normalize the input and query for case-insensitive matching
    const normalizedInput = this.normalizeString(input);
    const normalizedQuery = this.normalizeString(query);

    // Check if the normalized input contains the normalized query
    return normalizedInput.includes(normalizedQuery);
  }

  normalizeString(input: string): string {
    // Remove spaces and convert to lowercase
    return input.replace(/\s+/g, '').toLowerCase();
  }


  

  onSearchQueryChange() {
    this.loadSuppliers(); // Reload assets based on the updated search query
  }

  initializeEditingArrays() {
    this.editing = new Array(this.suppliers.length).fill(false);
    this.editedEmail = new Array(this.suppliers.length);
    this.editedPhoneNumber = new Array(this.suppliers.length);
    this.editedAddress = new Array(this.suppliers.length);
    this.editedWebsite=new Array(this.suppliers.length);
  }

  editSupplier(index: number) {
    this.editing[index] = true;
    this.editedEmail[index] = this.suppliers[index].email;
    this.editedPhoneNumber[index] = this.suppliers[index].phoneNumber;
    this.editedAddress[index] = this.suppliers[index].address;
    this.editedWebsite[index] = this.suppliers[index].website;
  }

  saveChanges(index: number) {
    const editedSupplier = {
      id: this.suppliers[index].id,
      name: this.suppliers[index].name,
      email: this.editedEmail[index],
      phoneNumber:this.editedPhoneNumber[index],
      address: this.editedAddress[index],
      website:this.editedWebsite[index]
    };

    this.supplierService.updateSupplier(editedSupplier).subscribe(
      () => {
        this.editing[index] = false;
        // Optionally, you can update the supplier in the local array
        this.suppliers[index].email = editedSupplier.email;
        this.suppliers[index].phno = editedSupplier.phoneNumber;
        this.suppliers[index].address = editedSupplier.address;
        this.suppliers[index].website = editedSupplier.website;
        this.suppliers[index] = editedSupplier;

      },
      (error) => {
        console.error('Error updating supplier:', error);
      }
    );
  }

  cancelEdit(index: number) {
    this.editing[index] = false;
  }

  deleteSupplier(id: number) {
    this.supplierService.deleteSupplier(id).subscribe(
      () => {
        // Optionally, you can remove the supplier from the local array
        const index = this.suppliers.findIndex(supplier => supplier.id === id);
        if (index !== -1) {
          this.suppliers.splice(index, 1);
        }
      },
      (error) => {
        console.error('Error deleting supplier:', error);
      }
    );
  }

  loadSupplierAssets() {
    this.suppliers.forEach((supplier) => {
      this.supplierService.getAssetsSuppliedBySupplier(supplier.name).subscribe(
        (assets) => {
          this.supplierAssets[supplier.name] = assets;
        },
        (error) => {
          console.error(`Error fetching assets for ${supplier.name}:`, error);
        }
      );
    });
  }
}
