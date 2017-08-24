import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, Platform, ToastController } from 'ionic-angular';

import { ComponentLabels } from './../../utilities/component-labels/component-lables';
import { DBServices } from './../../providers/db-services/db-services';
import { Messages } from './../../utilities/messages/messages';
import { TakeNotesModal } from './../../modals/take-notes-modal/take-notes-modal';
import { ShowToast } from './../../common/show-toasts';

@Component({
  selector: 'page-notes-list',
  templateUrl: 'notes-list.html',
  providers: [ComponentLabels, Messages, ShowToast]
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
    private platform : Platform,
    private toastController : ToastController,
    private messages : Messages,
    private showToast : ShowToast
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

  /**
   * @desc open the take note modal
   * pass the note title to the modal
   * set the context as new which indicates a new note and pass it to the modal.
   * @param title 
   */
  showTakeNotesModal(title : string) {
    let takeNoteModal = this.modalController.create(TakeNotesModal,{
      title : title,
      context : 'new'
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

  /**
   * @desc remove the selected note from the list.
   * Internally this will remove the document from the pouchdb
   * In order to remove the document from the pouchdb we will have to specify:
   *  1. document Id of the document stored in pouchdb
   *  2. revision Id of the document stored in pouchdb 
   * @param docId 
   * @param revId 
   */
  removeNote(docId : string, revId : string, noteTitle : string) {
    this.dbService.removeData(docId, revId).then(
      response => {
        this.getAllNotes();
        console.log('Note deleted', response);
        // Once the note is deleted successfully show the message to user using toast
        this.showToast.showToastMessage(
          this.messages.messages.notesList.deleteNote.successMessage(noteTitle),
          3000,
          'bottom'
        )
      },
      error => {
        console.log('Failed to delete the note', error);
        // If the deletion of note failed show the failure message to the user using toast
        this.showToast.showToastMessage(
          this.messages.messages.notesList.deleteNote.errorMessage(noteTitle),
          3000,
          'bottom'
        )
      }
    )
  }

  /**
   * @desc make changes to the selected note.
   * pass the notes to the take notes modal
   * @param noteObject 
   */
  editNote(noteObject : any) {
    console.log(noteObject.doc.dbData.notes);
    let takeNoteModal = this.modalController.create(TakeNotesModal,{
      noteObject : noteObject,
      context : 'edit'
    })
    takeNoteModal.onDidDismiss(() => {
      console.log('Modal dismissed');
      this.getAllNotes();
    })
    takeNoteModal.present();
  }
}
