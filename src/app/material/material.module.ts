import { NgModule } from '@angular/core';
import {MatButtonModule, MatDividerModule, MatToolbarModule, MatTabsModule, MatCardModule,MatExpansionModule, MatProgressBarModule, MatGridListModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule, MatDialogModule, MatSidenavModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import {MatRippleModule} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import {ScrollingModule} from '@angular/cdk/scrolling';

const MaterialComponents= [
  MatButtonModule,
  MatRippleModule,
  MatDividerModule,
  MatToolbarModule,
  MatTabsModule,
  MatCardModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatGridListModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  OverlayModule,
  MatInputModule,
  MatDialogModule,
  MatSidenavModule,
  MatIconModule,
  MatSnackBarModule,
  ScrollingModule
];

@NgModule({

  imports:[MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
