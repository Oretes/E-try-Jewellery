import { Component, OnInit, EventEmitter, HostListener, Output, Input, SimpleChanges} from '@angular/core';
import { TypesService } from '../services/types.service';
import { GetJweleryService } from '../services/get-jwelery.service';
import {CategoriesService} from '../services/categories.service';
import {WebcamImage} from 'ngx-webcam';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public webcamImage: WebcamImage = null;
handleImage(webcamImage: WebcamImage) {
this.webcamImage = webcamImage;
}
isDisplay = false;
toggleDisplay() {
this.isDisplay = !this.isDisplay;
}

types = [];
  karats = [];
  karat1 = [];
  // weights = ["10gm"];
  //added today
  karat = [];
  weight : [];
  //till here
  categories = [];
  final = [];
  count = 0;
  allcats:any;
  alltypes:any;
  carat:any;
  test:boolean=true;
  loaded:boolean=true;
  constructor(private typeService: TypesService, private jewelleryService: GetJweleryService, private categoryService: CategoriesService) { }
  @Output() sendLink: EventEmitter<any> = new EventEmitter();
  @Input('attr.data-target') target: string;
  @Input('refresh') refresh: number = 0;
  @HostListener('click', ['$event.target']) onClick(btn) {
    // console.log("type =", this.type);
    // if (this.nextBlock){

    // tslint:disable-next-line: deprecation
    console.log(event.target);
    event.stopPropagation();
    const type = btn.getAttribute('class');
    const pair = btn.getAttribute('data-pair');
    this.sendLink.emit([btn.src, type, pair]);
    // this.params.parametercollection(event,"correct");
    // }
  }

 async ngOnInit() {
    // this.categoryService.getCategories().then((cat) =>{
    //   cat.forEach((cats)=>{
    //     const category = cats.data().name;
    //     this.typeService.getTypes().then((data) => {
    //       data.forEach(async doc => {
    //         const type = doc.data().type;
    //         const pair = doc.data().pair;
    //         const results = await this.jewelleryService.getJewellery(type,category);
    //         const mappedJewellery = results.docs.map(jewellery => jewellery.data());

    //         const finalObj = {
    //           type,
    //           pair,
    //           category,
    //           name: doc.data().name,
    //           jewellery: mappedJewellery
    //         };

    //         this.types.push(finalObj);
    //         console.log(this.types);

    //       });
    //     });
    //     this.categories.push(category);
    //     console.log(this.categories);
    //   })

    // })
 console.log("Here! Iam HERE")
  await this.categoryService.getCategories().then(async(cat)=> {
    await cat.forEach(async (cats)=>{
        const category = cats.data().name;
        this.allcats = cat.docs.map(category1 => category1.data().name);
        const typedocs = await this.typeService.getTypes();
        const types = typedocs.docs.map(types => [types.data().type, types.data().pair, types.data().name]);
        this.alltypes = typedocs.docs.map(types => types.data().type);
        //added here
         const karatdocs = await this.jewelleryService.getkarat(this.karats);
         const karat1 = karatdocs.docs.map(karat1 => [karat1.data().karat, karat1.data().karat]);
         this.carat = karatdocs.docs.map(karat1 => karat1.data().karat);

        //added here
        console.log(this.alltypes);
        types.forEach(async(type)=>{
          const pair = type[1];
          const jeweltype = type[0];
          const name = type[2];
          //added here
          const karat = type[3];
          const weight = type[4];
          //till hre
          const results = await this.jewelleryService.getJewellerybyCategory(jeweltype,category);
          const mappedJewellery = results.docs.map(jewellery => jewellery.data());
          const finalObj = {
            pair,
            name,
            jeweltype,
            category,
            //added today
            karat,
            weight,
            //till here
            jewellery:mappedJewellery
          }


         if(this.categories[this.allcats.indexOf(category)]){
          if(this.categories[this.allcats.indexOf(category)][this.alltypes.indexOf(type[0])]){
            this.categories[this.allcats.indexOf(category)][this.alltypes.indexOf(type[0])].push([finalObj]);
          }
          else{
            this.categories[this.allcats.indexOf(category)][this.alltypes.indexOf(type[0])] = [];
            this.categories[this.allcats.indexOf(category)][this.alltypes.indexOf(type[0])].push([finalObj]);
          }
         }
         else{
           this.categories[this.allcats.indexOf(category)]= []
           this.categories[this.allcats.indexOf(category)][this.alltypes.indexOf(type[0])] = [];
           this.categories[this.allcats.indexOf(category)][this.alltypes.indexOf(type[0])].push([finalObj]);
         }
          console.log(this.categories);
        })
      });
      this.count = this.count+1;
    });
    console.log(this.categories);
  }
 ngOnChanges(simpleChanges: SimpleChanges){
   console.log(simpleChanges)
   if(!simpleChanges.refresh.firstChange){
    this.types = [];
    this.categories = [];
    this.final = [];
    this.count = 0;
    this.allcats=[];
    //added today
    this.karat=[];
    this.weight=[];
    this.carat = [];
    //added today
    this.alltypes=[];
    this.test=true;
    this.loaded=true;
     this.ngOnInit();
   }

 }
//  isDisplay = true;
//   toggleDisplay() {
//     this.isDisplay = !this.isDisplay;
// }
 }

