import { TakeNotesModal } from './../../modals/take-notes-modal/take-notes-modal';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, Platform } from 'ionic-angular';

import { ComponentLabels } from './../../utilities/component-labels/component-lables';
import { DBServices } from './../../providers/db-services/db-services';

@Component({
  selector: 'page-notes-list',
  templateUrl: 'notes-list.html',
  providers: [ComponentLabels]
})
export class NotesListPage {
  private notesList : Array<Object>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertController : AlertController,
    private componentLabels : ComponentLabels,
    private modalController : ModalController,
    private dbService : DBServices,
    private platform : Platform
  ) 
  {
    this.platform.ready().then(() => {
      this.getAllNotes();
    })
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
      this.getAllNotes();
    })
    takeNoteModal.present();
  }

  /**
   * @desc Get all notes from the db
   * parse the document array and store all the notes in the notesList.
   */
  getAllNotes() {
    this.dbService.getAllData().then(
      data => {
        this.notesList = data.rows;
        console.log(this.notesList);
      },
      error => {
        console.log('Failed to get all the data');
      }
    )
  }
}
