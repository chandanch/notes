import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ComponentLabels } from './../../utilities/component-labels/component-lables';

/**
 * Generated class for the NotesListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-notes-list',
  templateUrl: 'notes-list.html',
  providers: [ComponentLabels]
})
export class NotesListPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertController : AlertController,
    private componentLabels : ComponentLabels
  ) 
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesListPage');
  }

  createNotes() {
    console.log("create");
    let titlePrompt = this.alertController.create({
      title : this.componentLabels.addNoteAlertLabels.title,
      message : this.componentLabels.addNoteAlertLabels.message,
      inputs : [
        {
          name : this.componentLabels.addNoteAlertLabels.inputName,
          placeholder : this.componentLabels.addNoteAlertLabels.inputPlaceHolder
        }
      ],
      buttons : [
        {
          text : this.componentLabels.addNoteAlertLabels.okButton,
          handler : title => {
            console.log(title);
          }

        },
        {
          text : this.componentLabels.addNoteAlertLabels.cancelButtton
        }
      ]
    });
    titlePrompt.present();

  }

}
