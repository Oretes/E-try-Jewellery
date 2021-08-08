import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase/app'
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: AngularFirestore) { }

  getCategories() {
    return this.firestore.collection('categories',  ref => ref.orderBy("order")).get().toPromise();

  }
  getDocs(name){
    return this.firestore.collection('categories', ref=>ref.where("name",'==',name)).get().toPromise();

  }
  getjewelDocs(name){
    return this.firestore.collection('jewellery', ref => ref.where("category","==", name)).get().toPromise();

  }
async deleteDocs(name){
const qs1 = await this.getDocs(name);
qs1.docs.map((data)=> data.ref.delete());
const qs2 = await this.getjewelDocs(name)
qs2.docs.map((data)=> data.ref.delete());
}


getCategoryByOrder(order){

  return this.firestore.collection('categories', ref=>ref.where("order",'>=',order)).get().toPromise();


}
async IncOrder(order){
  const qs1 = await this.getCategoryByOrder(order);

    qs1.forEach((doc)=>{
      console.log(doc.data());
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
  const qs2 = await this.getCategoryByOrder(order);
  qs2.forEach((doc)=>{
    doc.ref.update({
      order:firebase.firestore.FieldValue.increment(-1)
    })
  })
  }
  async changeCategory(selected,name){
  const qs1 = await this.getDocs(selected);
  qs1.forEach((doc)=>{
    doc.ref.update({
      name:name
    })

  })
  const qs2 = await this.getjewelDocs(selected);
  qs2.forEach((doc)=>{
    doc.ref.update({
      category:name
    })
  })
  }
}
