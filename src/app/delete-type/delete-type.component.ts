import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { TypesService } from '../services/types.service';
@Component({
  selector: 'app-delete-type',
  templateUrl: './delete-type.component.html',
  styleUrls: ['./delete-type.component.css']
})
export class DeleteTypeComponent implements OnInit {
  delete={
    types:[],
    name:"",
    typenames:[]
  }
  message:string="";
  constructor(private typeService: TypesService) { }
  @Output() typeDeleted = new EventEmitter();
  @Input('refresh') refresh: number = 0;
  ngOnInit() {
    this.typeService.getTypes().then((data)=>{
      var type = [];
      var typename = [];
      data.forEach((doc)=> {
     
        type.push(doc.data().name);
        typename.push(doc.data().type);
      })
      this.delete.types = type;
      this.delete.typenames= typename;
})
  }
  deleteType(){
    if(this.delete.name!=""){
      this.message = "";
      var con = confirm("Deleting this type will delete all the jewellery that belongs to this type, are you sure you want to delete the type?")
      if(con){
        this.typeService.DecOrder(this.delete.name).then(()=>{
          this.typeService.deleteDocs(this.delete.name).then(()=>{
            
            this.typeDeleted.emit("typeDeleted");
            this.delete.name = "";
            this.ngOnInit();
          });
        });
      }
      else{
        alert("No jewellery deleted");
      }
    }
    else{
      this.message="Please fill all the filed";
    }
  
  }
  ngOnChanges(){
    console.log("Refreshing Delete");
    this.delete={
      types:[],
      name:"",
      typenames:[]
    }
    this.ngOnInit();
  }

}
