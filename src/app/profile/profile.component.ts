import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private clipboard: Clipboard, private _snackBar:MatSnackBar) { }

  copyEmail() {
    const email = $('#email').text();
    this.clipboard.copy(email);
    this._snackBar.open("¡Copiado!", 'x', { horizontalPosition: "end", verticalPosition: "bottom", duration: 2000})
  }

  copyPhone() {
    const phone = $('#phone').text();
    this.clipboard.copy(phone);
    this._snackBar.open("¡Copiado!", 'x', { horizontalPosition: "end", verticalPosition: "bottom", duration: 2000})
  }

  ngOnInit(): void {
  }

}
