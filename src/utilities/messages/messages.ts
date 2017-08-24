import { Injectable } from '@angular/core';

@Injectable()

export class Messages {
    public messages : any;
    constructor() {
        this.messages = {
            takeNotes : {
                saveNote : {
                    successMessage : (noteTitle : string) => {
                        return noteTitle+" saved sucessfully!"
                    },
                    errorMessage : (noteTitle : string) => {
                        return "OOPS!" + noteTitle +"note not saved"
                    }
                },
                editNote : {
                    successMessage : (noteTitle : string) => {
                        return noteTitle+" updated sucessfully!"
                    },
                    errorMessage : (noteTitle : string) => {
                        return "OOPS!" + noteTitle +"note not saved"
                    }
                },
            },
            notesList : {
                deleteNote : {
                    successMessage: (noteTitle: string) => {
                        return noteTitle + " deleted sucessfully!"
                    },
                    errorMessage: (noteTitle: string) => {
                        return "OOPS!" + noteTitle + "couldn't be deleted"
                    }
                }
            }
        }
    }
}