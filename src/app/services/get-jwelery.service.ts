import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class GetJweleryService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getJewellerybyType(type: string) {
    return this.firestore.collection('jewellery', ref => ref.where('type', '==', type )).get().toPromise();
  }
  getJewellerybyCategory(type: string, category: string){
    return this.firestore.collection('jewellery', ref => ref.where('category', '==', category ).where('type','==',type)).get().toPromise();
  }
  getDocs(source){
    return this.firestore.collection('jewellery', ref=>ref.where("image_source",'==',source)).get().toPromise();

  }
  getkarat(krt){
    return this.firestore.collection('jewellery',ref => ref.where("karats", '==',krt)).get().toPromise();

  }
  getWeight(wt){
   return this.firestore.collection('jewellery',ref => ref.where('weight','==',wt)).get().toPromise();
  }
  async deleteDocs(source){
    const qs1 = await this.getDocs(source);
    qs1.docs.map((data)=> data.ref.delete());

}
}
