
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// All custom class and modules go here
import { NotesListPage } from './../pages/notes-list/notes-list';
import { FirebaseServices } from './../providers/firebase-services/firebase-services';
import { PushNotificationServices } from './../providers/push-notification-services/push-notification-services';


@Component({
  templateUrl: 'app.html',
  providers: [FirebaseServices, PushNotificationServices]
})
export class MyApp {
  rootPage: any = NotesListPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private firebaseService: FirebaseServices, private pushNotifcationServices : PushNotificationServices) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //this.firebaseService.initFireBase();
      //this.pushNotifcationServices.registerDevice();
      //this.pushNotifcationServices.recieveNotification();
    });
  }

}

