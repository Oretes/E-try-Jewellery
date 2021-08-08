import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<InstructionsComponent>) { }

  ngOnInit() {
  }


close() {
    this.dialogRef.close();
}
}
