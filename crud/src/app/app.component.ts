import { Component,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';
  displayedColumns: string[] = ['Name', 'Email', 'Company','Action'];
  dataSource!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog,private api:ApiService){

  }
  ngOnInit():void{
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'60%',
      height:'60%'
    }).afterClosed().subscribe(val=>{
      if(val==='Save'){
        this.getAllProducts()
      }
    })
  }
  getAllProducts(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource = res;
        this.dataSource.sort((a, b) => {
          const nameA = a.Name.toLowerCase();
          const nameB = b.Name.toLowerCase();
          if (nameA < nameB) { return -1; }
          if (nameA > nameB) { return 1; }
          return 0;
        });
      },
      error:()=>{
        console.log("error");
      }
    })
  }
  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      // if(val==='Update'){
      //   this.getAllProducts();
      // }
      console.log(val);
    })
  }
  deleteProduct(id:number){
    if(confirm("are you sure to delete")){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("deleted succesfully")
        this.getAllProducts();
      },error:()=>{
        alert("error")
      }
    })}
  }
  applyFilter(data: any) {
    if(data){
    const searchTerm = data.toLowerCase();
    this.dataSource = this.dataSource.filter(product => product.Name.toLowerCase().includes(searchTerm));}
    else if(data===''){
      this.api.getProduct().subscribe({
        next:(res)=>{
          this.dataSource = res;
          this.dataSource.sort((a, b) => {
            const nameA = a.Name.toLowerCase();
            const nameB = b.Name.toLowerCase();
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
            return 0;
          });
        },
        error:()=>{
          console.log("error");
        }})
    }
  }
  backToHome(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource = res;
        this.dataSource.sort((a, b) => {
          const nameA = a.Name.toLowerCase();
          const nameB = b.Name.toLowerCase();
          if (nameA < nameB) { return -1; }
          if (nameA > nameB) { return 1; }
          return 0;
        });
      },
      error:()=>{
        console.log("error");
      }})
  }
}
