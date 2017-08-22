import { TakeNotesModal } from './../../modals/take-notes-modal/take-notes-modal';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { ComponentLabels } from './../../utilities/component-labels/component-lables';
import { DBServices } from './../../providers/db-services/db-services';

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
    private componentLabels : ComponentLabels,
    private modalController : ModalController,
    private dbService : DBServices
  ) 
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesListPage');
  }

  /**
   * @desc show prompt alert to enter title
   */
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
            titlePrompt.dismiss();
            // this.navCtrl.push(TakeNotes, {
            //   title : title.title
            // })        
            this.showTakeNotesModal(title.title);   
            return false;
          }

        },
        {
          text : this.componentLabels.addNoteAlertLabels.cancelButtton
        }
      ]
    });
    titlePrompt.present();
  }

  showTakeNotesModal(title : string) {
    let takeNoteModal = this.modalController.create(TakeNotesModal,{
      title : title
    })
    takeNoteModal.onDidDismiss(() => {
      console.log('Modal dismissed');
    })
    takeNoteModal.present();
  }
}
