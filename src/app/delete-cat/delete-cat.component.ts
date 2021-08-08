import { Component, OnInit,EventEmitter, Output, Input} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable, pipe} from 'rxjs';
import { TypesService } from '../services/types.service';
import{CategoriesService} from '../services/categories.service'

@Component({
  selector: 'app-delete-cat',
  templateUrl: './delete-cat.component.html',
  styleUrls: ['./delete-cat.component.css']
})
export class DeleteCatComponent implements OnInit {
  delete={
    categories:[],
    name:"",
  
  }
  message:string="";
  constructor(private firestore: AngularFirestore, private categoryService: CategoriesService) { }
  @Output() categoryDeleted = new EventEmitter();
  @Input('refresh') refresh: number = 0;
  ngOnInit() {
    this.categoryService.getCategories().then((data)=>{
      var category = [];
      data.forEach((doc)=> {
        console.log(doc.data().name);
        category.push(doc.data().name);
      })
      this.delete.categories = category;
})
  }
deleteCategory(){
  if(this.delete.name!=""){
    this.message = "";
    var con = confirm("Deleting the category, will delete all the jewellery associated with it! Are you sure you want to proceed?");
    if(con){
      this.categoryService.deleteDocs(this.delete.name).then(()=>{
        console.log("Category delted");
        this.categoryDeleted.emit("categoryDeleted");
        this.delete.name = "";
        this.ngOnInit();
      });
    }
    else{
      alert("Nothing deleted");
    }
  }
  else{
    this.message = "Please fill all the fields";
  }
}
ngOnChanges(){
  console.log("Refreshing Delete");
  this.ngOnInit();
}
}
