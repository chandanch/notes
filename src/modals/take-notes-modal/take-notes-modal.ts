import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { DBServices } from './../../providers/db-services/db-services';
import { Messages } from './../../utilities/messages/messages';
import { DBModel } from './../../common/model/db-model';

@Component({
    templateUrl: 'take-notes-modal.html',
    providers: [Messages]
})

export class TakeNotesModal {
    private noteTitle : string;
    private notes : string;
    private dbObject : DBModel;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private dbService: DBServices,
        private toastController: ToastController,
        private messages: Messages,
        private viewController : ViewController

    ) {
        this.noteTitle = this.navParams.get('title');
        console.log(this.noteTitle);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TakeNotesPage');
    }

    /**
     * Core function of the Notes app, Get the title and the notes
     * Store the notes and the title on the pouchdb database
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
     * @desc Go back to notes-list and show toast
     */
    navigateToNotesList() {
        let toast = this.toastController.create({
            message: this.messages.messages.takeNotes.saveNote.successMessage(this.noteTitle),
            duration: 3000,
            position: "bottom"
        });
        toast.present();
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


    getCurrentDate(): string {
        var currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth();
        let year = currentDate.getFullYear();
        return day + "-" + month + "-" + year;
    }

    getCurrentTime(): string {
        var currentTime = new Date();
        return currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
    }

    dismiss() {
        //this.viewController.dismiss();
        this.dbService.destroyDB().then(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        )
    }
}