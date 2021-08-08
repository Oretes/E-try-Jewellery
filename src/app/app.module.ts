import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {WebcamModule} from 'ngx-webcam';
import {CountdownModule} from 'ngx-countdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { CanvasComponent } from './canvas/canvas.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { DropZoneDirective } from './drop-zone.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material/material.module';
import { AddCatComponent } from './add-cat/add-cat.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { DeleteCatComponent } from './delete-cat/delete-cat.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { DeleteTypeComponent } from './delete-type/delete-type.component';
import { DeleteJewelleryComponent } from './delete-jewellery/delete-jewellery.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {ChangecatnameComponent} from'./changecatname/changecatname.component';
import {ChangetypenameComponent} from './changetypename/changetypename.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {AngularFirePerformanceModule,PerformanceMonitoringService} from '@angular/fire/performance';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CameraComponent } from './camera/camera.component';
import { CardComponent } from './card/card.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaymentComponent } from './payment/payment.component';
import { SessionmodalComponent } from './sessionmodal/sessionmodal.component';
import {AuthenticationGuard} from './services/authentication.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CanvasComponent,
    SidebarComponent,
    AdminComponent,
    DropZoneDirective,
    AddCatComponent,
    AddTypeComponent,
    DeleteCatComponent,
    InstructionsComponent,
    DeleteTypeComponent,
    DeleteJewelleryComponent,
    AdminLoginComponent,
    ChangecatnameComponent,
    ChangetypenameComponent,
    CameraComponent,
    CardComponent,
    ContactComponent,
    NavbarComponent,
    PaymentComponent,
    SessionmodalComponent,



  ],
  imports: [
    CountdownModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    WebcamModule,
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [AngularFirestore, AngularFireDatabase,AngularFireAuth, ScreenTrackingService,UserTrackingService, PerformanceMonitoringService,AuthenticationGuard],
  bootstrap: [AppComponent],
  entryComponents:[InstructionsComponent]

})
export class AppModule { }
