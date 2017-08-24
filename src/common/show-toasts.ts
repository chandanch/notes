import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()

/**
 * @desc This is a common service to show toast for various states, conditions
 * within a specific component. 
 */
export class ShowToast {

    constructor(private toastController : ToastController) {
    }

    showToastMessage(message : string, duration : number, position : string) {
        let toast = this.toastController.create({
            message : message,
            duration : duration,
            position : position
        })
        toast.present();
    }
}