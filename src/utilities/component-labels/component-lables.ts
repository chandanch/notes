import { AddNoteLabelModel } from './addNoteLabels-model';
import { Injectable } from '@angular/core';

@Injectable()
export class ComponentLabels {
    public addNoteAlertLabels : AddNoteLabelModel;

    constructor() {
        this.addNoteAlertLabels = {
            title : 'Add Note',
            message : 'Enter the Note Title',
            inputPlaceHolder : 'Note Title',
            okButton : 'Add',
            cancelButtton : 'Cancel',
            inputName : 'title'
        }
    }
}