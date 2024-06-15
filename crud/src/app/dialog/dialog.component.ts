import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  
  shareProjectForm!: FormGroup;
  entries: { email: string, option: string }[] = [];
  ownerEmail: string = 'aditibhosale@gmail.com';
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    // this.productForm = this.formBuilder.group(
    //   {
    //     Name : ['',Validators.required],
    //     Email : ['',Validators.required],
    //     Company : ['',Validators.required]
    //   }
    // )
    this.shareProjectForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      option: ['Option 1', Validators.required]
    });

    // Adding the owner entry to the entries array
    this.entries.push({ email: this.ownerEmail, option: 'Owner' });
    // if(this.editData){
    //   this.actionBtn="Update"
    //   this.productForm.controls['Name'].setValue(this.editData.Name);
    //   this.productForm.controls['Email'].setValue(this.editData.Email);
    //   this.productForm.controls['Company'].setValue(this.editData.Company);
    // }
    //this.entries.push({ email: this.ownerEmail, option: 'Owner' });
  }
  // addProduct(){
  //   if(!this.editData){
  //     if(this.productForm.valid){
  //       this.apiService.postProduct(this.productForm.value).subscribe({
  //         next:(res)=>{
  //           alert("added succesfully");
  //           this.productForm.reset();
  //           this.dialogRef.close("Save");
  //         },
  //         error:()=>{
  //           alert("not added");
  //         }
  //       })
  //     }
  //   }else{
  //     this.updateProduct();
  //   }
  // }
  // updateProduct(){
  //   this.apiService.putProduct(this.productForm.value,this.editData.id).subscribe({
  //     next:(res)=>{
  //       alert("Product updated")
  //       this.productForm.reset()
  //       this.dialogRef.close('Update')
  //     },
  //     error:()=>{
  //       alert("error")
  //     }
  //   })
  // }
  onSubmit(): void {
    if (this.shareProjectForm.valid) {
      // Add the new entry before the owner entry
      this.entries.splice(this.entries.length - 1, 0, this.shareProjectForm.value);
      this.shareProjectForm.reset({ email: '', option: 'Option 1' });
    }
  }

  updatePermission(index: number, newPermission: string): void {
    this.entries[index].option = newPermission;
  }

  deleteEntry(index: number): void {
    this.entries.splice(index, 1);
  }
}
