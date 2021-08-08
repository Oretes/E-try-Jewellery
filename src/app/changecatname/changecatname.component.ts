import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import{CategoriesService} from '../services/categories.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-changecatname',
  templateUrl: './changecatname.component.html',
  styleUrls: ['./changecatname.component.css']
})
export class ChangecatnameComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private categoryService: CategoriesService) { }
  changecat = {
    categories:[],
    selected:"",
    name:""
  }
  message:string="";

  @Output() categoryChanged = new EventEmitter();
  @Input('refresh') refresh: number = 0;
  ngOnInit() {
    this.categoryService.getCategories().then((data)=>{
      var category = [];
      data.forEach((doc)=> {
        console.log(doc.data().name);
        category.push(doc.data().name);
      })
      this.changecat.categories = category;
})
  }
  changeCategory(){
    if(this.changecat.name!=="" && this.changecat.selected!==""){
      this.message = "";
      console.log("Change Cat initiated");
      this.categoryService.changeCategory(this.changecat.selected, this.changecat.name).then(()=>{
        console.log("Category delted");
        this.categoryChanged.emit("categoryChanged");
        this.changecat.name = "";
        this.ngOnInit();
      });
    }
    else{
      this.message = "Please fill all the fields";
    }
  }

}
