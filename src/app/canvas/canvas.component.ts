// tslint:disable-next-line: max-line-length
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  EventEmitter,
  HostListener,
  Output,
  SimpleChanges,
} from "@angular/core";
import { fabric } from "fabric";
import { Jewel } from "../models/jewel";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { InstructionsComponent } from "../instructions/instructions.component";
import {WebcamImage} from 'ngx-webcam';
import {Subject,Observable} from 'rxjs';
import {CameraComponent} from "../camera/camera.component";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.css"],
})
export class CanvasComponent implements OnInit {
// latest snapshot
public webcamImage: WebcamImage = null;
handleImage(webcamImage: WebcamImage) {
this.webcamImage = webcamImage;
}

 rect: any;
  ctx: HTMLCollection;
  canvas = new fabric.Canvas("myCanvas");
  typesOnCanvas: { [type: string]: Jewel } = {};
  onScreen = 0;
  constructor(private dialog: MatDialog) {}
  // tslint:disable-next-line: no-input-rename
  @Input("canvasWidth") canvasWidth: number;
  // tslint:disable-next-line: no-input-rename
  @Input("canvasHeight") canvasHeight: number;
  // tslint:disable-next-line: no-input-rename
  @Input("newImage") newImage: string;
  // tslint:disable-next-line: no-input-rename
  @Input("type") type: string;
  // tslint:disable-next-line: no-input-rename
  @Input("pair") pair: string;
  @Input("changesMade") changesMade: number;
  // @Input("webcamImage") WebcamImage:string;

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges) {
    console.log();
    if (this.canvasWidth >= 1200) {
      this.canvas.setWidth(this.canvasWidth);
      this.canvas.setHeight(this.canvasHeight);
    } else {
      this.canvas.setWidth(this.canvasWidth);
      this.canvas.setHeight(this.canvasHeight);
    }
    this.canvas.calcOffset();
    if (changes.changesMade) {
      if (this.type !== undefined) {
        this.AddImage();
      }
      if (this.pair === "true") {
        this.AddImage(this.type + "1");
      }
    }
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.canvas = new fabric.Canvas("myCanvas");
    this.canvas.preserveObjectStacking = true;
    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);
    this.canvas.backgroundColor = null;
    this.canvas.renderAll.bind(this.canvas);
    this.canvas.on("object:moving", (evt) => {
      // console.log(evt.target.left);
      const target = evt.target;
      if (this.typesOnCanvas[target.name]) {
        this.typesOnCanvas[target.name].top = target.top;
        this.typesOnCanvas[target.name].left = target.left;
      }
      if (evt.target.left > this.canvasWidth - 100) {
        evt.target.left = this.canvasWidth - 200;
      }
      if (evt.target.top > this.canvasHeight - 100) {
        evt.target.top = this.canvasHeight - 200;
      }
      if (evt.target.left < 10) {
        evt.target.left = 10;
      }
      if (evt.target.top < 10) {
        evt.target.top = 10;
      }
    });

    this.canvas.on("mouse:wheel", (e: any) => {
      const mousevent = e.e;
      mousevent.preventDefault();
      const target = this.canvas.getActiveObject();
      const delta = -mousevent.deltaY / 1000;

      if (target) {
        target.scaleX += delta;
        target.scaleY += delta;

        // constrain
        if (target.scaleX < 0.1) {
          target.scaleX = 0.1;
          target.scaleY = 0.1;
        }
        // constrain
        if (target.scaleX > 1) {
          target.scaleX = 1;
          target.scaleY = 1;
        }
        // scaleControl.value = target.scaleX;
        // checkear();
        this.handleScaling(target);
        this.checkpair();
        target.setCoords();

        this.canvas.renderAll();
        return false;
      }
    });
    this.canvas.on("object:scaling", (evt) => {
      const target = evt.target;
      this.handleScaling(target);
      this.checkpair();
    });
  }

  ngOnInit() {}

  checkbounds() {
    const object = this.canvas.getActiveObject();
    console.log(object.left, object.top);
  }
  Addbg(files: FileList) {
    this.canvas.clear();
    console.log(files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgObj = new Image();
      imgObj.crossOrigin = "Anonymous";
      imgObj.src = String(reader.result);
      imgObj.onload = () => {
      const image = new fabric.Image(imgObj);
      image.name = "background";
      image.scaleToWidth(400);
      image.center();
      image.setCoords();
      this.canvas.add(image);
      image.center();
      image.setCoords();
      this.canvas.sendToBack(image);
      this.canvas.renderAll();
      };
    };
    reader.readAsDataURL(files[0]);
    (<HTMLInputElement>document.getElementById("file_upload")).value = "";
  }


  DeleteImage() {
    const image = this.canvas.getActiveObject();
    if (!image) {
      alert("No Image selected");
      return;
    }
    if (image["pair"] === "true") {
      this.canvas.forEachObject((obj) => {
        console.log(image.name);
        if (
          obj.name === image.name.substring(0, image.name.length - 1) ||
          obj.name === image.name + "1"
        ) {
          this.canvas.remove(obj);
          this.canvas.requestRenderAll();
        }
      });
      this.canvas.remove(image);
    } else {
      this.canvas.remove(image);
    }
  }

  dataURIToBlob(dataURI, callback) {
    const binStr = atob(dataURI.split(",")[1]);
    const len = binStr.length;
    const arr = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }

    callback(new Blob([arr]));
  }

  DownloadImage() {
    const callback = (blob) => {
      const a = document.createElement("a");
      a.download = Date.now() + "-image.png";
      a.innerHTML = "download";
      // the string representation of the object URL will be small enough to workaround the browser's limitations
      a.href = URL.createObjectURL(blob);
      // you must revoke the object URL,
      //   but since we can't know when the download occured, we have to attach it on the click handler..
      a.click();
      a.onclick = () => {
        // ..and to wait a frame
        requestAnimationFrame(() => {
          URL.revokeObjectURL(a.href);
        });
        a.removeAttribute("href");
      };
      this.FindandDelete("watermark");
    };
    if (this.getBGdetails().width === 0) {
      alert("Please add your image to enable download");
    } else {
      fabric.Image.fromURL(
        "assets/watermark.png",
        (oImg) => {
          oImg.name = "watermark";
          var obj = this.getBGdetails();
          var new_width = obj.width * obj.scalex;
          var new_height = obj.height * obj.scalex;
          var new_posx = obj.x;
          var new_posy = obj.y;
          console.log(obj);
          oImg.originX = "right";
          oImg.originY = "top";
          oImg.left = new_posx;
          oImg.top = new_posy;
          oImg.selectable = false;
          oImg.scaleToWidth(new_width / 3);
          this.canvas.add(oImg);
          const imgData = this.canvas.toDataURL({
            format: "png",
            multiplier: 4,
          });
          this.dataURIToBlob(imgData, callback);
        },
        { crossOrigin: "Anonymous" }
      );
    }
  }
  FindandDelete(name) {
    this.canvas.getObjects().forEach((element) => {
      if (element.name === name) {
        this.canvas.remove(element);
        console.log("Found and deleted");
      }
    });
  }

  checkpair() {
    // Determines if the selected object is a pair and then both pair in the pair are scalled together.
    const selected = this.canvas.getActiveObject();

    if (selected["pair"] === "true") {
      this.canvas.forEachObject((obj) => {
        if (
          obj.name === selected.name.substring(0, selected.name.length - 1) ||
          obj.name === selected.name + "1"
        ) {
          obj.scale(selected.scaleX).setCoords();
          this.canvas.requestRenderAll();
        }
      });
    }
  }
  AddImage(type = this.type) {
    fabric.Image.fromURL(
      this.newImage,
      (oImg) => {
        oImg.name = type;
        let pair = "pair";
        oImg[pair] = this.pair;
        // oImg.lockScalingFlip = true;
        // oImg.lockUniScaling = true;
        // oImg.lockRotation = true;
        oImg.hasRotatingPoint = true;
        if (this.typesOnCanvas[type]) {
          oImg.top = this.typesOnCanvas[type].top;
          oImg.left = this.typesOnCanvas[type].left;
          // oImg.scaleX = this.typesOnCanvas[type].scale;
          // oImg.scaleY = this.typesOnCanvas[type].scale;
        } else {
          const tempJewel = new Jewel();
          tempJewel.top = 30;
          tempJewel.left = 50;
          tempJewel.scale = 1;
          oImg.top = 30;
          oImg.left = 60;
          this.typesOnCanvas[type] = tempJewel;
        }
        oImg.scaleToWidth(200);
        this.FindandDelete(oImg.name);
        console.log(oImg.name);
        console.log(this.pair);
        this.canvas.add(oImg);
        // console.log(this.typesOnCanvas[type].width)
        if (this.typesOnCanvas[type].width) {
          oImg.scaleToWidth(this.typesOnCanvas[type].width);
          oImg.setCoords();
        }
      },
      { crossOrigin: "Anonymous" }
    );
  }
  oncanvas(name: string) {
    this.canvas.forEachObject((obj) => {
      if (obj.name === name) {
        console.log(obj.name);
        this.onScreen = 1;
        return [
          obj.oCoords.br.x,
          obj.oCoords.br.y,
          obj.scaleX,
          obj.width,
          obj.height,
        ];
      }
    });
    return this.onScreen;
  }
  handleScaling(target) {
    if (this.typesOnCanvas[target.name]) {
      this.typesOnCanvas[target.name].scale = target.scaleX;
      this.typesOnCanvas[target.name].width = target.scaleX * target.width;
      if (this.typesOnCanvas[target.name + "1"]) {
        console.log("Updating both");
        this.typesOnCanvas[target.name + "1"].scale = target.scaleX;
        this.typesOnCanvas[target.name + "1"].width =
          target.scaleX * target.width;
      }
      if (
        this.typesOnCanvas[target.name.substring(0, target.name.length - 1)]
      ) {
        console.log("Updating both");
        this.typesOnCanvas[
          target.name.substring(0, target.name.length - 1)
        ].scale = target.scaleX;
        this.typesOnCanvas[
          target.name.substring(0, target.name.length - 1)
        ].width = target.scaleX * target.width;
      }
    }
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(InstructionsComponent, dialogConfig);
  }
  getBGdetails() {
    var bgDetails = {
      x: 0,
      y: 0,
      scalex: 1,
      width: 0,
      height: 0,
    };
    this.canvas.forEachObject((obj) => {
      if (obj.name === "background") {
        bgDetails.x = obj.oCoords.tr.x;
        bgDetails.y = obj.oCoords.tr.y;
        bgDetails.scalex = obj.scaleX;
        bgDetails.width = obj.width;
        bgDetails.height = obj.height;
      }
    });
    return bgDetails;
  }}
