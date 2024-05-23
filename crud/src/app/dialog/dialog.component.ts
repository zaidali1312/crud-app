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
    if(this.editData){
      this.actionBtn="Update"
      this.productForm.controls['Name'].setValue(this.editData.Name);
      this.productForm.controls['Email'].setValue(this.editData.Email);
      this.productForm.controls['Company'].setValue(this.editData.Company);
    }
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
}
