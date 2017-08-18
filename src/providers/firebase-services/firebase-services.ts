import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


//declare var firebase;

/*
  Generated class for the FirebaseServicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseServices {

  private requestUrl : string;
  

  constructor(public http: Http) {
    this.requestUrl = "assets/config/firebaseConfig.json";
  }

  initFireBase() {
    // firebase.database().ref('notes/' + '123').set({
    //   noteTitle: 'First Note',
    //   noteText : 'First note we are using'
    // });
  }

}
