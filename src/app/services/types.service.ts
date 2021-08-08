import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app'
@Injectable({
  providedIn: 'root'
})
export class TypesService {

  constructor(private firestore: AngularFirestore) { }

  getTypes() {
    return this.firestore.collection('types',ref => ref.orderBy("order")).get().toPromise();
  }

  getDocs(name){
    return this.firestore.collection('types', ref=>ref.where("type",'==',name)).get().toPromise();
    
  }
  getjewelDocs(name){
    return this.firestore.collection('jewellery', ref => ref.where("type","==", name)).get().toPromise();
    
  }
  async deleteDocs(name){
    const qs1 = await this.getDocs(name);
    qs1.docs.map((data)=> data.ref.delete());
    const qs2 = await this.getjewelDocs(name)
    qs2.docs.map((data)=> data.ref.delete());
    }
  getTypeByOrder(order){

      return this.firestore.collection('types', ref=>ref.where("order",'>=',order)).get().toPromise();


  }
async IncOrder(order){
const qs1 = await this.getTypeByOrder(order);

  qs1.forEach((doc)=>{
    doc.ref.update({
      order:firebase.firestore.FieldValue.increment(1)
    })
  })

}
async DecOrder(name){
  var order = 0;
 const qs1 = await  this.getDocs(name);
 qs1.forEach((doc)=>{
   order = doc.data().order;
})
const qs2 = await this.getTypeByOrder(order);
qs2.forEach((doc)=>{
  doc.ref.update({
    order:firebase.firestore.FieldValue.increment(-1)
  })
})
}
async changeType(selected,name,typename){
  const qs1 = await this.getDocs(selected);
  qs1.forEach((doc)=>{
    doc.ref.update({
      name:name,
      type:typename
    })

  })
  const qs2 = await this.getjewelDocs(selected);
  qs2.forEach((doc)=>{
    doc.ref.update({
      type:typename
    })
  })
  }
}
