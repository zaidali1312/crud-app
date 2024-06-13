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

  productForm !: FormGroup;
  actionBtn : string = "Save"
  shareProjectForm!: FormGroup;
  entries: { email: string, option: string }[] = [];
  ownerEmail: string = 'aditibhosale@gmail.com';
  constructor(private formBuilder:FormBuilder,private apiService:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group(
      {
        Name : ['',Validators.required],
        Email : ['',Validators.required],
        Company : ['',Validators.required]
      }
    )
    this.shareProjectForm = this.formBuilder.group({
      email: [''],
      option: ['']
    });
    if(this.editData){
      this.actionBtn="Update"
      this.productForm.controls['Name'].setValue(this.editData.Name);
      this.productForm.controls['Email'].setValue(this.editData.Email);
      this.productForm.controls['Company'].setValue(this.editData.Company);
    }
    this.entries.push({ email: this.ownerEmail, option: 'Owner' });
  }
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.apiService.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("added succesfully");
            this.productForm.reset();
            this.dialogRef.close("Save");
          },
          error:()=>{
            alert("not added");
          }
        })
      }
    }else{
      this.updateProduct();
    }
  }
  updateProduct(){
    this.apiService.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Product updated")
        this.productForm.reset()
        this.dialogRef.close('Update')
      },
      error:()=>{
        alert("error")
      }
    })
  }
  onSubmit(): void {
    const formValues = this.shareProjectForm.value;
    this.entries.push({ email: formValues.email, option: formValues.option });
    this.shareProjectForm.reset();  
    this.moveOwnerToEnd();
  }
  deleteEntry(index: number): void {
    this.entries.splice(index, 1);
  }
  updatePermission(index: number, newOption: string): void {
    this.entries[index].option = newOption;
    this.moveOwnerToEnd();
  }
  private moveOwnerToEnd(): void {
    // Find the owner entry and move it to the end of the array
    const ownerIndex = this.entries.findIndex(entry => entry.email === this.ownerEmail);
    if (ownerIndex !== -1 && ownerIndex !== this.entries.length - 1) {
      const ownerEntry = this.entries.splice(ownerIndex, 1)[0];
      this.entries.push(ownerEntry);
    }
  }
}
