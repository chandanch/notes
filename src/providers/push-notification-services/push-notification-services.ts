import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Push, PushToken } from '@ionic/cloud-angular';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the PushNotificationServicesProvider provider.
*/
@Injectable()
export class PushNotificationServices {

  constructor(public http: Http, public push : Push, private alertController : AlertController) {
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

  /**
   * @desc Recieve push notification and show the notification message in alert
   */
  recieveNotification() {
    this.push.rx.notification().subscribe(
      (message) => {
        console.log(message);
        let prompt = this.alertController.create({
          title : message.title,
          subTitle : message.text,
          buttons : [
            {
              text : 'Okay Got it!'
            }
          ]
        });
        prompt.present();
      }
    )
  }
}
