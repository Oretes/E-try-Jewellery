
import { Component, OnInit,EventEmitter, Output,Input} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable, pipe} from 'rxjs';
import { TypesService } from '../services/types.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {
  newtype={
    name:"",
    pair:"",
    pairs:["true","false"],
    typelist:[],
    type:"",
    order:0
  }
  message:string="";
  constructor(private typeService: TypesService, private firestore: AngularFirestore,) { }
  @Output() typeCreated = new EventEmitter();
  @Input('refresh') refresh: number = 0;
  ngOnInit() {
    this.typeService.getTypes().then((data)=>{
      var types = [];
      data.forEach((doc)=> {
        const type = String(doc.data().type);
        types.push(type);
      })
      this.newtype.typelist = types;
      
    })
  }

newType(){
    if(this.newtype.name!=="" && this.newtype.pair!=="" && this.newtype.type!=="" &&this.newtype.order!==0){
      this.message = "";
      if(!this.newtype.typelist.includes(this.newtype.type)){
        this.typeService.IncOrder(this.newtype.order).then(()=>{
          this.firestore.collection("types").add({
        
            name: this.newtype.name,
            type:this.newtype.type,
            pair:this.newtype.pair,
            order:this.newtype.order
          }).then(()=> {
            
            this.typeCreated.emit("type");
            this.newtype={
              name:"",
              pair:"",
              pairs:["true","false"],
              typelist:[],
              type:"",
              order:0
            }
            this.ngOnInit();
          })
        })

      }
      else{
        alert("This type already exists")
      }
    }
    else{
      this.message = "Please fill all the fields";
    }
    }
    ngOnChanges(){
      this.newtype={
        name:"",
        pair:"",
        pairs:["true","false"],
        typelist:[],
        type:"",
        order:0
      }
      this.ngOnInit();
    }
}
