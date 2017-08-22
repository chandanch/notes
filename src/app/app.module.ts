import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { NotesListPage } from './../pages/notes-list/notes-list';
import { DBServices } from '../providers/db-services/db-services';
import { TakeNotesModal } from './../modals/take-notes-modal/take-notes-modal';


const ionicCloudSettings : CloudSettings = {
  'core' : {
    app_id : '533f7305',
    
  },
  'push' : {
    sender_id : '373681691982',
    pluginConfig : {
      'android' : {
        icon: "notification",
        iconColor : '#387EF5',
        sound : true,
        vibrate : true,
      }
    }
  }
}

@NgModule({
  declarations: [
    MyApp,
    NotesListPage,
    TakeNotesModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(ionicCloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotesListPage,
    TakeNotesModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DBServices,
  ]
})
export class AppModule {}
