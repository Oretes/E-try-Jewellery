import { Component, OnInit,EventEmitter, Output,Input} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable, pipe} from 'rxjs';
import { TypesService } from '../services/types.service';
import{CategoriesService} from '../services/categories.service'
@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.css']
})
export class AddCatComponent implements OnInit {
  newcat={
    categories:[],
    name:"",
    order:0
  }
  message:string="";
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private categoryService: CategoriesService) { }
  @Output() categoryCreated = new EventEmitter();
  @Input('refresh') refresh: number = 0;
  ngOnInit() {

    this.categoryService.getCategories().then((data)=>{
      var category = [];
      data.forEach((doc)=> {
        console.log(doc.data().name);
        category.push(doc.data().name);
      })
      this.newcat.categories = category;
})
  }
  newcategory(){
    var cats = this.newcat.categories.map(v=> v.toLowerCase());
    if(this.newcat.name!=="" && this.newcat.order!==0){
    this.message = "";
    if(!cats.includes(this.newcat.name.toLowerCase())){
      this.categoryService.IncOrder(this.newcat.order).then(()=>{
          this.firestore.collection("categories").add({

        name: this.newcat.name,
        order:this.newcat.order
      }).then(()=> {
        this.ngOnInit();
        this.categoryCreated.emit("Category");

      })})

    }
    else{
      alert("Category already exists, Please check!");
    }
  }
  else{
    this.message = "Please fill all the fields";
  }

  }

ngOnChanges(){
  this.newcat={
    categories:[],
    name:"",
    order:0
  }
  this.ngOnInit();
}

}
