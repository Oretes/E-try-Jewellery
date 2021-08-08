import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable, pipe} from 'rxjs';
import { TypesService } from '../services/types.service';
import{CategoriesService} from '../services/categories.service'
import { GetJweleryService } from '../services/get-jwelery.service';
import {AuthService} from '../services/auth.service'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 task: AngularFireUploadTask;
 percentage: Observable<number>;
 snapshot: Observable<any>;
 downloadURL: Observable<string>;
 show:boolean=false;
 refresh:number=0;
 newImage: string;
 type: string;
 pair: boolean;
 changesMade:number;
 karat:Observable<string>;
 weight:Observable<string>;
 newJewellery = {
 name: "",
 type:[],
 selected:"",
//  added here
 weight:"",
 weights:[],
 karat: [],
 karats:["24k","22k","20k"],
//  end here
 category:[],
 categorySelected:"",
 file:""
 }


 selectedFile:any;
 file: any;
 message:string="";

//  pair = ["true","false"]
 isHovering:boolean;
  constructor(private storage:AngularFireStorage, private typeService: TypesService, private firestore: AngularFirestore, private categoryService: CategoriesService,private jewelleryService: GetJweleryService, public auth:AuthService) { }

  ngOnInit() {

    this.typeService.getTypes().then((data)=>{
      var types = [];
      data.forEach((doc)=> {
        const type = String(doc.data().type);
        types.push(type);
      })
      this.newJewellery.type = types;

    })
    console.log(this.newJewellery);
    this.categoryService.getCategories().then((data)=>{
      var category = [];
      data.forEach((doc)=> {
        console.log(doc.data().name);
        category.push(doc.data().name);

      })
      this.newJewellery.category = category;
})
this.jewelleryService.getkarat(this.karat).then((data)=>{
  var karats = [];
  data.forEach((doc)=> {
 console.log(doc.data().name);
 karats.push(doc.data().name);
  })
  this.newJewellery.karats = karats;
})
this.jewelleryService.getWeight(this.weight).then((data)=>{
  var weight = [];
  data.forEach((doc)=>{
    console.log(doc.data().name);
    weight.push(doc.data().name);
  })
})
  }
  register(form) {
    console.log(form.value);
    console.log(form.touched);
    console.log(form.submitted);
  }
startUpload(event: FileList){
  const file = event.item(0)
  if(file.type.split('/')[0] !== 'image'){
    this.file = ""
  }
  else{
    this.file = file;
  }
console.log("Drooped");
}
isActive(snapshot){
  return snapshot.state ==='running' && snapshot.bytesTransferred < snapshot.totalBytes
}
async newjewellery(newjewel:any){

const path = `${new Date().getTime()}_${this.file.name}`;
const customMetaData = { jewelType: 'Neckalace'};
if(this.file == ""){
  alert("Please select an Image file only");
}
else{
if(this.newJewellery.selected!="" && this.newJewellery.categorySelected!==""  && this.newJewellery.name!=="" && this.newJewellery.weight!==""){
  this.message = "";
  this.task = this.storage.upload(path,this.file);
  this.percentage = this.task.percentageChanges();
  this.snapshot = this.task.snapshotChanges();
  const ref = this.storage.ref(path);
  await this.task.snapshotChanges().toPromise();
  this.downloadURL = await ref.getDownloadURL().toPromise();
  this.show = true;
  this.firestore.collection("jewellery").add({
  image_source: this.downloadURL,
  name: this.newJewellery.name,
  type: this.newJewellery.selected,
  category:this.newJewellery.categorySelected,
  // added here
  karats: this.newJewellery.karat,
  weight: this.newJewellery.weight,
  // end
}).then(()=>{
newjewel.resetForm();
this.NewChange(event);
})
}
else{
  console.log("All fileds are not filled");
  this.message = "All Field are not filled";
}
}
}
toggleHover(event:boolean){
  this.isHovering =event;
}
 async NewChange(event){
  this.ngOnInit();
  this.show = true;
  console.log("working");
  setTimeout(() => {this.show=false}, 2000);
  this.refresh = this.refresh+1;



}

sendLink(child) {
  this.newImage = child[0];

  if(this.newImage){
    var confirmclick = confirm("Are you sure you want to delete the clicked image? ");

  if(confirmclick){
    this.show = true;
    this.jewelleryService.deleteDocs(this.newImage).then(()=>{
      this.refresh = this.refresh+1;
      this.ngOnInit();
    });

    setTimeout(() => {this.show=false}, 2000);

  }
  else{
    alert("Image has not been deleted");
  }
 }
}


}
