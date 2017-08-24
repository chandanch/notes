import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { DBServices } from './../../providers/db-services/db-services';
import { Messages } from './../../utilities/messages/messages';
import { DBModel } from './../../common/model/db-model';
import { ShowToast } from './../../common/show-toasts';

@Component({
    templateUrl: 'take-notes-modal.html',
    providers: [Messages, ShowToast]
})

export class TakeNotesModal {
    private noteTitle : string;
    private notes : string;
    private dbObject : DBModel;
    private context : string;
    private noteObject : any

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private dbService: DBServices,
        private toastController: ToastController,
        private messages: Messages,
        private viewController : ViewController,
        private showToast : ShowToast

    ) {
        this.noteTitle = this.navParams.get('title');
        // get the context first
        this.context = this.navParams.get('context');
        // check if the context is edit
        if(this.context == 'edit') {
            // goto edit notes context
            this.editNotesContext();
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TakeNotesPage');
    }

    /**
     * @desc get the `notesObject` and  
     * load the notes and the notes title to edit the note 
     */
    editNotesContext() {
        this.noteObject = this.navParams.get('noteObject');
        // console.log(this.noteObject.dbData.notes);
        this.noteTitle = this.noteObject.doc.dbData.title
        this.notes = this.noteObject.doc.dbData.notes
    }

    /**
     * @desc check the context : edit | new
     * inovke saveNotes() or updateNotes() methods depending on the context
     */
    saveContext() {
        if(this.context === 'edit') {
            this.updateNotes();
        }
        else {
            this.saveNotes();
        }
    }

    /**
    * get the title and the notes
    * store the notes and the title on the pouchdb database
    */
    saveNotes() {
        console.log("Notes", this.notes);
        let dataObject = {
            title: this.noteTitle,
            notes: this.notes,
            date: this.getCurrentDate(),
            time: this.getCurrentTime(),
        };
        this.dbObject = {
            _id: this.generateNoteId(this.noteTitle),
            dbData: dataObject,
        };
        console.log(this.dbObject);
        this.dbService.addData(this.dbObject).then(
            response => {
                console.log("Note added", response);
                this.navigateToNotesList();
            },
            error => {
                console.log("Failed to add note", error);
            }
        );
    }

    /**
     * @desc update the existing note
     * properties being updated: 1.notes 2.date 3.time
     * On sucess navigate back to the notes list
     */
    updateNotes() {
        let dataObject = {
            title: this.noteTitle,
            notes: this.notes,
            date: this.getCurrentDate(),
            time: this.getCurrentTime(),
        };
        this.dbObject = {
            _id : this.noteObject.doc._id,
            dbData : dataObject,
            _rev : this.noteObject.doc._rev
        };
        this.dbService.addData(this.dbObject).then(
            response => {
                console.log("Note updated", response);
                this.navigateToNotesList();
            },
            error => {
                console.log('failed to update note', error);
            }
        )   
    }

    /**
    * @desc Go back to notes-list and show toast
    */
    navigateToNotesList() {
        let message : string;
        if(this.context === 'edit') {
            message = this.messages.messages.takeNotes.editNote.successMessage(this.noteTitle)
        }
        else {
            message = this.messages.messages.takeNotes.saveNote.successMessage(this.noteTitle)
        }
        this.showToast.showToastMessage(message, 3000, 'bottom');
        this.viewController.dismiss();
    }

    /**
     * @desc Generate a unique id for adding to db
     * @param title 
     * @returns string
     */
    generateNoteId(title: string): string {
        var currentDateTime = new Date();
        return title.replace(" ", "")
            + currentDateTime.getDate() + currentDateTime.getMonth() + currentDateTime.getFullYear() +
            currentDateTime.getHours() + currentDateTime.getMinutes() +
            currentDateTime.getSeconds();
    }


    /**
     * @desc get the current date
     */
    getCurrentDate(): string {
        var currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth();
        let year = currentDate.getFullYear();
        return day + "-" + month + "-" + year;
    }

    /**
     * @desc get current time
     */
    getCurrentTime(): string {
        var currentTime = new Date();
        return currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
    }

    dismiss() {
        this.viewController.dismiss();
        // this.dbService.destroyDB().then(
        //     response => {
        //         console.log(response);
        //     },
        //     error => {
        //         console.log(error);
        //     }
        // )
    }
}