import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { TypesService } from '../services/types.service';

@Component({
  selector: 'app-changetypename',
  templateUrl: './changetypename.component.html',
  styleUrls: ['./changetypename.component.css']
})
export class ChangetypenameComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private typeService: TypesService) { }
  changetype = {
    types:[],
    typenames:[],
    selected:"",
    name:"",
    typename:""
  }
  message:string="";
  @Output() typeChanged = new EventEmitter();
  @Input('refresh') refresh: number = 0;
  ngOnInit() {
    this.typeService.getTypes().then((data)=>{
      var type = [];
      var typename = []
      data.forEach((doc)=> {
        console.log(doc.data().name);
        type.push(doc.data().name);
        typename.push(doc.data().type);
      })
      this.changetype.types = type;
      this.changetype.typenames = typename;
})
  }
  changeType(){
    if(this.changetype.name!=="" && this.changetype.selected!=="" &&this.changetype.typename!==""){
      this.message = "";
      console.log("Change Type");
      this.typeService.changeType(this.changetype.selected, this.changetype.name,this.changetype.typename).then(()=>{
 
        this.typeChanged.emit("TypeChanged");
        this.changetype.name = "";
        this.ngOnInit();
      });
    }
    else{
      this.message ="Please fill all the fields";
    }
  }
  ngOnChanges(){
    this.changetype = {
      types:[],
      typenames:[],
      selected:"",
      name:"",
      typename:""
    }
    this.ngOnInit();
  }

}
