import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Push, PushToken } from '@ionic/cloud-angular';

/*
  Generated class for the PushNotificationServicesProvider provider.
*/
@Injectable()
export class PushNotificationServices {

  constructor(public http: Http, public push : Push) {
    console.log('Hello PushNotificationServicesProvider Provider');
  }

  /**
   * @desc Register the device to recieve push notification
   */
  registerDevice() {
    this.push.register().then(
      (pushToken : PushToken) => {
        return this.push.saveToken(pushToken)
      }
    ).then(
      (token : PushToken) => {
        console.log("Device registered Token Recieved", token);
      }
    )
  }

  recieveNotification() {
    this.push.rx.notification().subscribe(
      (message) => {
        alert(message.title + '\n' + message.text);
      }
    )
  }
}
